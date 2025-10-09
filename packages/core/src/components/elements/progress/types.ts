export type ProgressProps = {
  /**
   * Progress value (0-100)
   */
  value: number;
  
  /**
   * Progress variant
   * @default "bar"
   */
  variant?: "bar" | "circular";
  
  /**
   * Size of the progress indicator
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Show percentage text
   * @default false
   */
  showLabel?: boolean;
  
  /**
   * Color variant
   * @default "primary"
   */
  color?: "primary" | "success" | "warning" | "error";
};
