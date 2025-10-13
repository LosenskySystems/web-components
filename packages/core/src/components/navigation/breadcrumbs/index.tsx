import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';

// Compound component pattern
Breadcrumbs.Item = BreadcrumbItem;

export { Breadcrumbs, BreadcrumbItem };
export type { BreadcrumbsProps, BreadcrumbItemProps } from './breadcrumbs.types';
