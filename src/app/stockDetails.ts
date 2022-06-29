import { stock } from "./stock";

export class stockDetails {
    stocks: stock[] = [];
    minStockPrice!: number;
    maxStockPrice!: number;
    avgStockPrice!: number;
}