export type AlertType = "success" | "error" | "info" | "warning";

export interface AlertOptions {
    message: string;
    type?: AlertType;
    duration?: number;
}