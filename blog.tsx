import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React 19",
    excerpt: "Explore the latest features and improvements in React 19, including enhanced server components and better performance optimizations.",
    fullContent: `React 19 brings a wave of exciting features that make building modern web applications easier and more efficient than ever before.

Server Components have been significantly improved, offering better performance and reduced bundle sizes. The new use() hook simplifies data fetching and resource loading, making asynchronous operations more intuitive.

Actions are now a first-class concept in React, allowing you to handle form submissions and mutations with less boilerplate code. The framework now automatically handles pending states, optimistic updates, and error handling.

Performance improvements include faster hydration, better memory management, and reduced JavaScript bundle sizes. These enhancements mean your applications will load faster and feel more responsive to users.

The React team has also improved the developer experience with better error messages, enhanced TypeScript support, and improved debugging tools. Whether you're building a small personal project or a large-scale application, React 19 provides the tools you need to succeed.`
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS Grid Layouts",
    excerpt: "Learn how to create responsive and flexible grid layouts using Tailwind CSS utility classes with practical examples.",
    fullContent: `Tailwind CSS provides a powerful and intuitive way to create responsive grid layouts without writing custom CSS. The grid utilities make it simple to build complex layouts that adapt seamlessly across different screen sizes.

Start with the basics: use 'grid' to create a grid container, then define columns with 'grid-cols-{n}'. Responsive design is built right in with breakpoint prefixes like 'md:grid-cols-2' and 'lg:grid-cols-3'.

Gap utilities control spacing between grid items - 'gap-4' adds consistent spacing, while 'gap-x-4' and 'gap-y-6' let you control horizontal and vertical spacing independently.

For more advanced layouts, use 'col-span-{n}' to make items span multiple columns, and 'row-span-{n}' for vertical spanning. The 'auto-rows-{size}' utilities help manage row heights automatically.

Grid areas, alignment, and placement utilities give you fine-grained control. Use 'place-items-center' for centering, 'justify-items-start' for horizontal alignment, and 'items-end' for vertical positioning.

With Tailwind's grid system, you can create anything from simple card layouts to complex dashboard interfaces, all while maintaining clean, readable markup.`
  },
  {
    id: 3,
    title: "Building Accessible Web Components",
    excerpt: "Best practices for creating inclusive and accessible React components that work for everyone.",
    fullContent: `Accessibility isn't just a feature—it's a fundamental requirement for modern web applications. Building accessible components ensures that all users, regardless of their abilities, can interact with your application effectively.

Start with semantic HTML. Use proper heading hierarchies (h1-h6), navigation elements, and landmark regions. Screen readers rely on this structure to help users navigate your application.

ARIA attributes supplement HTML semantics when necessary. Add aria-label for icon buttons, aria-describedby for form hints, and aria-live regions for dynamic content updates. However, remember: the first rule of ARIA is to use native HTML elements when possible.

Keyboard navigation is crucial. Ensure all interactive elements are focusable and have visible focus indicators. Test your application using only the keyboard—if you can't complete core tasks, neither can keyboard users.

Color contrast matters. Text should have at least a 4.5:1 contrast ratio against its background for normal text, and 3:1 for large text. Never rely on color alone to convey information.

Form accessibility includes clear labels, error messages, and helpful hints. Use the correct input types, provide real-time validation feedback, and group related fields with fieldset elements.

By prioritizing accessibility from the start, you create better experiences for everyone while expanding your application's reach to all users.`
  },
  {
    id: 4,
    title: "TypeScript Tips for React Developers",
    excerpt: "Level up your React development with these essential TypeScript patterns and best practices.",
    fullContent: `TypeScript and React are a powerful combination, but mastering their integration requires understanding key patterns and best practices.

Component Props: Always type your props interfaces. Use 'interface' for component props and extend React types when needed. For example, extend 'React.ComponentProps<"button">' to inherit all native button props.

Generics make components reusable. Create flexible components that work with different data types while maintaining type safety. A generic 'List<T>' component can render any type of items.

Union types and discriminated unions help model component states accurately. Instead of optional booleans, use union types like 'status: "loading" | "success" | "error"' for clearer intent and better autocomplete.

The 'as const' assertion creates readonly values and literal types, perfect for action types and configuration objects. It prevents accidental mutations and enables better type inference.

Type guards and custom type predicates help TypeScript understand your runtime checks. Functions like 'isUser(value): value is User' narrow types safely.

Don't overuse 'any'. When you need an escape hatch, prefer 'unknown' which requires type checking before use. For props you don't care about, use specific types or 'Record<string, unknown>'.

Leverage utility types: 'Partial', 'Required', 'Pick', 'Omit', and 'ReturnType' save time and make your code more maintainable. They help you derive new types from existing ones without duplication.`
  },
  {
    id: 5,
    title: "Advanced State Management Patterns",
    excerpt: "Dive deep into modern state management solutions and learn when to use each approach in your React applications.",
    fullContent: `State management is one of the most important decisions in a React application. Different patterns suit different needs, and understanding them helps you choose the right tool for each job.

Local state with useState is perfect for isolated component state. When state doesn't need to be shared, keep it local. This makes components more reusable and easier to test.

useReducer shines for complex state logic with multiple sub-values or when the next state depends on the previous one. It provides predictable state updates and works well with TypeScript discriminated unions.

Context API is great for dependency injection and sharing data that doesn't change often (like themes or user preferences). However, be cautious—excessive context usage can lead to unnecessary re-renders.

For true application state, consider dedicated libraries. Zustand offers a minimal API with powerful capabilities. Its hook-based approach feels natural in React, and it handles subscriptions efficiently.

Jotai takes an atomic approach, where each piece of state is independent and composable. It's perfect for derived state and complex state relationships, with minimal boilerplate.

React Query and SWR specialize in server state—data fetched from APIs. They handle caching, revalidation, and background updates automatically, eliminating tons of boilerplate code.

The key is matching the pattern to the problem. Local state for UI, Context for dependency injection, state libraries for global app state, and server state libraries for remote data. Most applications use a combination of these patterns.`
  },
  {
    id: 6,
    title: "Optimizing React Performance",
    excerpt: "Practical techniques to make your React applications faster and more efficient.",
    fullContent: `Performance optimization isn't about premature optimization—it's about understanding where bottlenecks occur and addressing them strategically.

React DevTools Profiler is your first stop. It shows which components render, why they render, and how long rendering takes. Use it to identify slow components and unnecessary re-renders.

Memoization with React.memo prevents re-renders when props haven't changed. It's particularly useful for expensive components or components that render frequently. However, don't memoize everything—profiling should guide these decisions.

useMemo and useCallback prevent recalculation and function recreation. Use useMemo for expensive computations and useCallback when passing callbacks to memoized child components. Remember: these hooks have overhead, so use them judiciously.

Code splitting with React.lazy and Suspense reduces initial bundle size. Load routes and heavy components only when needed. This significantly improves time-to-interactive for large applications.

Virtualization handles long lists efficiently. Libraries like react-virtual render only visible items, making lists of thousands of items perform smoothly.

Web Workers move heavy computations off the main thread. Processing large datasets or complex calculations in a worker keeps your UI responsive.

Image optimization matters: use modern formats like WebP, implement lazy loading, and provide appropriate sizes for different screen sizes. Next.js Image component handles much of this automatically.

Finally, monitor real user performance with tools like Web Vitals. Metrics like LCP, FID, and CLS help you understand actual user experience and prioritize optimization efforts effectively.`
  }
];

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] shadow-[var(--shadow-card)]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {post.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {post.excerpt}
          </CardDescription>
        </CardHeader>

        <CollapsibleContent className="animate-accordion-down">
          <CardContent className="pt-0">
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="leading-relaxed whitespace-pre-line">{post.fullContent}</p>
            </div>
          </CardContent>
        </CollapsibleContent>

        <CardContent className="pt-0">
          <CollapsibleTrigger asChild>
            <Button 
              variant="default" 
              className="w-full group bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
            >
              {isOpen ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </CardContent>
      </Collapsible>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tech Blog
          </h1>
          <p className="text-muted-foreground mt-2">
            Insights, tutorials, and best practices for modern web development
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-20 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Tech Blog. Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
