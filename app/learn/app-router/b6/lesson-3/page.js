import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B6.3: URL State Management - Next.js Mastery",
  description: "Complete guide to managing URL state in Next.js App Router",
};

export default function Lesson3Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b6"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B6 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B6.3: URL State Management
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to manage URL state effectively in Next.js App Router:
          search params, query parameters, hash navigation, and common URL state
          patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Search Params */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Search Params
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Search parameters (query strings) are a powerful way to store state
            in the URL. They're shareable, bookmarkable, and can be read by
            Server Components and Client Components.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reading Search Params (Server Component)
          </h3>
          <CodeBlock
            code={`// app/search/page.js (Server Component)
export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort || 'relevance';

  // Fetch data based on search params
  const results = await searchDatabase(query, page, sort);

  return (
    <div>
      <h1>Search: {query}</h1>
      <p>Page: {page}</p>
      <p>Sort: {sort}</p>
      {/* Render results */}
    </div>
  );
}

// Multiple values for same key
// URL: /search?category=electronics&category=books
export default async function SearchPage({ searchParams }) {
  // In Server Components, searchParams is an object
  // Multiple values come as arrays
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];

  return <div>Categories: {categories.join(', ')}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reading Search Params (Client Component)
          </h3>
          <CodeBlock
            code={`// app/components/SearchResults.js (Client Component)
'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'relevance';

  return (
    <div>
      <h1>Search: {query}</h1>
      <p>Page: {page}</p>
      <p>Sort: {sort}</p>
    </div>
  );
}

// Wrap in Suspense boundary
export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

// Get all search params
function FilterPanel() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  
  return (
    <div>
      {Object.entries(params).map(([key, value]) => (
        <div key={key}>{key}: {value}</div>
      ))}
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Updating Search Params
          </h3>
          <CodeBlock
            code={`// app/components/FilterControls.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Update URL with new params
    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  const updateMultipleParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => updateSearchParam('q', e.target.value)}
        defaultValue={searchParams.get('q') || ''}
      />
      <select onChange={(e) => updateSearchParam('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}

// Replace (no history entry)
const replaceSearchParam = (key, value) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  router.replace(\`\${pathname}?\${params.toString()}\`);
};`}
            language="javascript"
          />
        </section>

        {/* Section 2: Query Parameters */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Query Parameters
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Query parameters are another term for search params. They're useful
            for filtering, pagination, sorting, and other state that should be
            reflected in the URL.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Filtering with Query Parameters
          </h3>
          <CodeBlock
            code={`// app/products/page.js
'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';

function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') || 'all';
  const minPrice = searchParams.get('minPrice') || '0';
  const maxPrice = searchParams.get('maxPrice') || '1000';

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <div>
      <select
        value={category}
        onChange={(e) => updateFilter('category', e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="clothing">Clothing</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => updateFilter('minPrice', e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => updateFilter('maxPrice', e.target.value)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <ProductFilters />
    </Suspense>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Pagination with Query Parameters
          </h3>
          <CodeBlock
            code={`// app/components/Pagination.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1');

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(\`\${pathname}?\${params.toString()}\`, { scroll: false });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>

      {/* Or use Link */}
      <Link
        href={\`\${pathname}?page=\${currentPage + 1}\`}
        scroll={false}
      >
        Next Page
      </Link>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Sorting with Query Parameters
          </h3>
          <CodeBlock
            code={`// app/components/SortControls.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function SortControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'relevance';
  const order = searchParams.get('order') || 'asc';

  const updateSort = (newSortBy) => {
    const params = new URLSearchParams(searchParams);
    
    // If clicking same field, toggle order
    if (newSortBy === sortBy) {
      params.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', newSortBy);
      params.set('order', 'asc');
    }

    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <div>
      <button onClick={() => updateSort('price')}>
        Price {sortBy === 'price' && (order === 'asc' ? '↑' : '↓')}
      </button>
      <button onClick={() => updateSort('date')}>
        Date {sortBy === 'date' && (order === 'asc' ? '↑' : '↓')}
      </button>
      <button onClick={() => updateSort('name')}>
        Name {sortBy === 'name' && (order === 'asc' ? '↑' : '↓')}
      </button>
    </div>
  );
}`}
            language="javascript"
          />
        </section>

        {/* Section 3: Hash Navigation */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Hash Navigation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Hash fragments (#section) are useful for navigating to specific
            sections within a page. They don't cause page reloads and are
            handled client-side.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Hash Navigation
          </h3>
          <CodeBlock
            code={`// app/page.js
export default function HomePage() {
  return (
    <div>
      <nav>
        <a href="#about">About Section</a>
        <a href="#services">Services Section</a>
        <a href="#contact">Contact Section</a>
      </nav>

      <section id="about">
        <h2>About</h2>
        <p>About content...</p>
      </section>

      <section id="services">
        <h2>Services</h2>
        <p>Services content...</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Contact content...</p>
      </section>
    </div>
  );
}

// Using Link component
import Link from 'next/link';

<Link href="#about">About</Link>
<Link href="/page#section">Section</Link>`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Programmatic Hash Navigation
          </h3>
          <CodeBlock
            code={`// app/components/TableOfContents.js
'use client'

import { useRouter, usePathname } from 'next/navigation';

export default function TableOfContents({ sections }) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    // Navigate to hash
    router.push(\`\${pathname}#\${sectionId}\`);
    
    // Or use native scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <nav>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}

// Reading hash from URL
'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ActiveSection() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    setActiveHash(hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash.slice(1));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname]);

  return <div>Active section: {activeHash}</div>;
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Hash Navigation with Smooth Scroll
          </h3>
          <CodeBlock
            code={`// app/components/SmoothHashLink.js
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SmoothHashLink({ href, children }) {
  const pathname = usePathname();

  const handleClick = (e) => {
    // Only handle if it's a hash link
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without scroll
        window.history.pushState(null, '', \`\${pathname}\${href}\`);
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}

// CSS for smooth scroll (globals.css)
// html {
//   scroll-behavior: smooth;
// }`}
            language="javascript"
          />
        </section>

        {/* Section 4: URL State Patterns */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. URL State Patterns
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Common patterns for managing URL state in Next.js applications.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            URL State Hook Pattern
          </h3>
          <CodeBlock
            code={`// lib/hooks/useUrlState.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlState(key, defaultValue = '') {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get(key) || defaultValue;

  const setValue = useCallback(
    (newValue) => {
      const params = new URLSearchParams(searchParams);
      
      if (newValue && newValue !== defaultValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }

      router.push(\`\${pathname}?\${params.toString()}\`);
    },
    [key, defaultValue, pathname, router, searchParams]
  );

  return [value, setValue];
}

// Usage
'use client'

import { useUrlState } from '@/lib/hooks/useUrlState';

export default function FilterComponent() {
  const [category, setCategory] = useUrlState('category', 'all');
  const [sortBy, setSortBy] = useUrlState('sortBy', 'relevance');

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Complex Filter State Pattern
          </h3>
          <CodeBlock
            code={`// lib/hooks/useFilters.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    return {
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sortBy: searchParams.get('sortBy') || 'relevance',
      order: searchParams.get('order') || 'asc',
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== '') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(\`\${pathname}?\${params.toString()}\`);
    },
    [pathname, router, searchParams]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  return { filters, updateFilters, resetFilters };
}

// Usage
'use client'

import { useFilters } from '@/lib/hooks/useFilters';

export default function ProductFilters() {
  const { filters, updateFilters, resetFilters } = useFilters();

  return (
    <div>
      <input
        type="text"
        placeholder="Category"
        value={filters.category}
        onChange={(e) => updateFilters({ category: e.target.value })}
      />
      
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => updateFilters({ minPrice: e.target.value })}
      />
      
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            URL Sync with Form State
          </h3>
          <CodeBlock
            code={`// app/components/SearchForm.js
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize from URL
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  // Sync URL when form changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      
      if (category !== 'all') {
        params.set('category', category);
      } else {
        params.delete('category');
      }

      router.push(\`\${pathname}?\${params.toString()}\`, { scroll: false });
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query, category, pathname, router, searchParams]);

  // Sync form when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
      </select>
    </form>
  );
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Shareable URL State
          </h3>
          <CodeBlock
            code={`// app/components/ShareableState.js
'use client'

import { useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function ShareableState() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get current URL with all params
  const getShareableUrl = useCallback(() => {
    const params = searchParams.toString();
    const url = \`\${window.location.origin}\${pathname}\${params ? \`?\${params}\` : ''}\`;
    return url;
  }, [pathname, searchParams]);

  const copyToClipboard = async () => {
    const url = getShareableUrl();
    await navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div>
      <p>Current URL: {getShareableUrl()}</p>
      <button onClick={copyToClipboard}>Copy Shareable Link</button>
    </div>
  );
}

// Deep link with all state
// URL: /products?category=electronics&minPrice=100&maxPrice=500&sortBy=price&order=asc
// This URL can be shared and will restore the exact filter state`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b6/lesson-2"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B6.2 next/link
          </Link>
          <Link
            href="/learn/app-router/b7"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B7 Metadata API →
          </Link>
        </div>
      </div>
    </div>
  );
}
