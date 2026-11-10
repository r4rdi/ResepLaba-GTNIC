export type Profile = "warmindo" | "madura" | "admin";

export type BusinessType = "WARMINDO" | "MADURA" | "BAKERY" | "OTHER";

export type StoreStatus = "ACTIVE" | "SUSPENDED";

export type Store = {
  id: string;
  name: string;
  ownerName: string;
  businessType: BusinessType;
  categoryLabel: string;
  whatsapp: string;
  status: StoreStatus;
  aiQuota: number;
  aiUsed: number;
  targetMargin: number;
  pin?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  baseUnit: string;
  purchaseUnit: string;
  conversionRate: number;
  unitCost: number;
  minStock: number;
};

export type BatchStatus = "ACTIVE" | "EXPIRED" | "DAMAGED" | "DEPLETED";

export type Batch = {
  id: string;
  itemId: string;
  code: string;
  expiresAt: string;
  qty: number;
  initialQty: number;
  unitCost: number;
  status: BatchStatus;
};

export type RecipeLine = { itemId: string; qty: number; wastePct: number };

export type ProductKind = "recipe" | "retail";

export type ProductCategory = "makanan" | "minuman" | "eceran";

export type ProductIcon = "meal" | "egg" | "rice" | "drink" | "soup" | "coffee" | "pack";

export type Product = {
  id: string;
  name: string;
  kind: ProductKind;
  category: ProductCategory;
  icon: ProductIcon;
  price: number;
  targetMargin: number;
  recipe: RecipeLine[];
};

export type TransactionLine = {
  productId: string;
  name: string;
  qty: number;
  price: number;
  hpp: number;
};

export type Transaction = {
  id: string;
  storeId: string;
  createdAt: string;
  day: string;
  total: number;
  hpp: number;
  profit: number;
  lines: TransactionLine[];
};

export type BroadcastSeverity = "warning" | "info";

export type Broadcast = {
  id: string;
  message: string;
  severity: BroadcastSeverity;
  createdAt: string;
};

export type Tenant = {
  id: string;
  storeId: string;
  name: string;
  ownerName: string;
  businessType: BusinessType;
  categoryLabel: string;
  status: StoreStatus;
  transactionsToday: number;
  aiUsed: number;
  aiQuota: number;
  joinedAt: string;
};

export type TemplateItem = {
  name: string;
  baseUnit: string;
  purchaseUnit: string;
  conversionRate: number;
  unitCost: number;
  minStock: number;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  items: TemplateItem[];
};

export type ReceiptDraftRow = {
  itemId: string;
  name: string;
  purchaseQty: number;
  purchaseUnit: string;
  conversionRate: number;
  totalCost: number;
  expiresAt: string;
};

export type ReceiptDraft = {
  supplier: string;
  receiptDate: string;
  rows: ReceiptDraftRow[];
};

export type Workspace = {
  store: Store;
  items: InventoryItem[];
  batches: Batch[];
  products: Product[];
  transactions: Transaction[];
};

export type Snapshot = {
  store: Store;
  items: InventoryItem[];
  batches: Batch[];
  products: Product[];
  transactions: Transaction[];
  broadcasts: Broadcast[];
  tenants: Tenant[];
  templates: Template[];
};

export type ApiResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
  warnings: string[];
};

export type RestockInput = {
  itemId: string;
  purchaseQty: number;
  totalCost: number;
  expiresAt: string;
  code: string;
};

export type CheckoutInput = { productId: string; qty: number }[];

export type CheckoutOutput = {
  transaction: Transaction;
  portions: { productId: string; portions: number }[];
};
