"use client";

import React from "react";
import Link from "next/link";
import * as SubframeUtils from "../utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={SubframeUtils.twClassNames(
        "flex flex-wrap items-center gap-1 text-caption font-caption text-subtext-color",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = (
          <span
            className={
              isLast
                ? "font-caption-bold text-default-font"
                : "hover:text-default-font transition-colors"
            }
          >
            {item.label}
          </span>
        );

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-neutral-400" aria-hidden>
                /
              </span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded px-1 py-0.5 -mx-1 -my-0.5 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
              >
                {content}
              </Link>
            ) : (
              <span className="flex items-center">{content}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
