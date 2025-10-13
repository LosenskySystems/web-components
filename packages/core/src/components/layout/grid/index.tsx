import { Grid as GridComponent } from './Grid';
import { GridItem } from './GridItem';

// Compound component pattern
export const Grid = Object.assign(GridComponent, {
  Item: GridItem,
});

// Export types
export type { GridProps, GridItemProps } from './grid.types';

