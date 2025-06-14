# 🧠 Lógicas de Negocio - Procesamiento Inteligente

## 📋 Introducción

Este middleware implementa lógicas de negocio específicas para cada compañía, aplicando diferentes reglas de validación y categorización tanto para **vendedores** como para **facturas**. Cada compañía tiene sus propios requerimientos empresariales que se reflejan en el procesamiento automatizado de datos.

---

## 🔍 Swagger

Este middleware implementa swagger para la documentacion

🪐 ruta: `http://localhost:3000/api`

## ⚙️ Versiones

- **🔄 NodeJS**: v18.18.0
- **🧩 NestJS**: 10.4.5
- **🧪 Jest**: ^29.7.0
- **🔍 Swagger**: ^7.4.0

---

## 🔧 Run Proyect

- **🔄 NodeJS**:

```bash

npm i --save

npm run start:dev

```

- **🧩 Docker (Opcional)**:

```bash

docker build -t finecto_test .

docker run --name finecto_test_container -p 3000:3000 -d finecto_test

docker ps

docker logs finecto_test_container

```

---

## 🏢 Compañía A - Lógicas de Negocio

### 👥 Procesamiento de Vendedores (Company A)

**Objetivo**: Identificar y gestionar vendedores internacionales que requieren validación bancaria adicional.

#### 🔍 Reglas de Negocio:

- **Vendedores de EE.UU.**: No requieren validación adicional
- **Vendedores Internacionales**: Requieren confirmación de detalles bancarios internacionales

#### ⚙️ Lógica Implementada:

```typescript
if (!vendor.isFromUS()) {
   vendor.internationalBank = "Please confirm international bank details"; 
```

#### 📊 Ejemplos de Transformación:

| **Entrada**          | **País** | **Salida**                                                        |
| -------------------- | -------- | ----------------------------------------------------------------- |
| Global Supplies Ltd. | `FR`     | ✅ internationalBank: "Please confirm international bank details" |
| Local Corp           | `US`     | ✅ Sin campos adicionales                                         |
| Tokyo Industries     | `JP`     | ✅ internationalBank: "Please confirm international bank details" |

---

### 🧾 Procesamiento de Facturas (Company A)

**Objetivo**: Categorizar facturas basándose en la presencia de productos con alcohol.

#### 🔍 Reglas de Negocio:

- **Facturas con Alcohol**: Código de cuenta `ALC-001`
- **Facturas Sin Alcohol**: Código de cuenta `STD-001`

#### ⚙️ Lógica Implementada:

```typescript
const ProductCategories = invoice.getProductCategories();
const hadAlcohol = ProductCategories.some(
    (category) => category == ProductCategory.ALCOHOL
);
if (hadAlcohol) invoice.setAccount(Account.ALC_001);
else invoice.setAccount(Account.STD_001);
```

#### 📊 Ejemplos de Transformación:

| **Descripción de Líneas**                | **Código de Cuenta** | **Categoría**  |
| ---------------------------------------- | -------------------- | -------------- |
| "Office supplies", "Beverages - alcohol" | `ALC-001`            | 🍷 Con Alcohol |
| "Office supplies", "Water bottles"       | `STD-001`            | 📋 Estándar    |

---

## 🏢 Compañía B - Lógicas de Negocio

### 👥 Procesamiento de Vendedores (Company B)

**Objetivo**: Validar que los vendedores estadounidenses tengan toda la documentación requerida.

#### 🔍 Reglas de Negocio:

- **Vendedores No-EE.UU.**: Automáticamente verificados
- **Vendedores EE.UU.**: Requieren número de registro Y ID fiscal

#### ⚙️ Lógica Implementada:

```typescript
if (
    vendor.isFromUS() &&
    !vendor.hasRegistrationNumber() &&
    !vendor.hasTaxId()
)
    vendor.setVendorStatus(
        "Incomplete - missing registration/tax details"
    );
else if (vendor.isFromUS() && !vendor.hasRegistrationNumber())
    vendor.setVendorStatus("Incomplete - missing registration details");
else if (vendor.isFromUS() && !vendor.hasTaxId())
    vendor.setVendorStatus("Incomplete - missing tax details");
else vendor.setVendorStatus("Verified");
delete vendor.registrationNumber;
delete vendor.taxId;
```

#### 📊 Estados de Validación:

| **País** | **Registro** | **Tax ID** | **Estado**                                         |
| -------- | ------------ | ---------- | -------------------------------------------------- |
| `US`     | ❌           | ❌         | 🚫 "Incomplete - missing registration/tax details" |
| `US`     | ❌           | ✅         | 🚫 "Incomplete - missing registration details"     |
| `US`     | ✅           | ❌         | 🚫 "Incomplete - missing tax details"              |
| `US`     | ✅           | ✅         | ✅ "Verified"                                      |
| `CA`     | N/A          | N/A        | ✅ "Verified"                                      |

---

### 🧾 Procesamiento de Facturas (Company B)

**Objetivo**: Categorización multi-producto considerando alcohol Y tabaco.

#### 🔍 Reglas de Negocio:

- **Alcohol + Tabaco**: Código `MULTI-B` (Producto mixto)
- **Solo Alcohol**: Código `ALC-B` (Solo alcohol)
- **Solo Tabaco**: Código `TOB-B` (Solo tabaco)
- **Sin Restricciones**: Código `STD-B` (Estándar)

#### ⚙️ Lógica Implementada:

```typescript
const ProductCategories = invoice.getProductCategories();
const hadAlcohol = ProductCategories.some(
    (category) => category == ProductCategory.ALCOHOL
);
const hadTobacco = ProductCategories.some(
    (category) => category == ProductCategory.TOBACCO
);
if (hadAlcohol && hadTobacco) invoice.setAccount(Account.MULTI_B);
else if (hadTobacco) invoice.setAccount(Account.TOB_B);
else if (hadAlcohol) invoice.setAccount(Account.ALC_B);
else invoice.setAccount(Account.STD_B);
```

#### 📊 Matriz de Categorización:

| **Alcohol** | **Tabaco** | **Código** | **Descripción**       |
| ----------- | ---------- | ---------- | --------------------- |
| ✅          | ✅         | `MULTI-B`  | 🚬🍷 Productos Mixtos |
| ✅          | ❌         | `ALC-B`    | 🍷 Solo Alcohol       |
| ❌          | ✅         | `TOB-B`    | 🚬 Solo Tabaco        |
| ❌          | ❌         | `STD-B`    | 📋 Productos Estándar |

#### 🎯 Ejemplos Prácticos:

| **Líneas de Factura**                | **Resultado** |
| ------------------------------------ | ------------- |
| "Wine bottles", "Cigarette packs"    | `MULTI-B`     |
| "Beer", "Office supplies"            | `ALC-B`       |
| "Tobacco leaves", "Packaging"        | `TOB-B`       |
| "Office chairs", "Computer monitors" | `STD-B`       |

---

## 🔧 Implementación Técnica

### 🏭 Factory Pattern

El sistema utiliza el patrón Factory para crear los procesadores apropiados:

```typescript
export class VendorProcessorFactory {
    /**
     * Creates a vendor processor instance for the specified company
     * @param {string} company - Company identifier (case-insensitive)
     * @returns {IVendorProcessor} Vendor processor instance for the company
     * @throws {ConflictResponse} When company is not supported
     * @example
     * const processor = factory.createVendorProcessor("A");
     */
    createVendorProcessor(company: string): IVendorProcessor {
        switch (company.toUpperCase()) {
            case CompanyType.COMPANY_A:
                return new CompanyAVendorProcessor();
            case CompanyType.COMPANY_B:
                return new CompanyBVendorProcessor();
            default:
                throw new ConflictResponse(`Unsupported company: ${company}`);
        }
    }
}

```

### 🧪 Beneficios de la Arquitectura

- **🔄 Extensibilidad**: Agregar Compañía C es agregar nuevos processors
- **🧩 Mantenibilidad**: Cada lógica está encapsulada en su propia clase
- **🧪 Testeable**: Cada processor se puede probar independientemente
- **📈 Escalable**: No hay límite en el número de compañías soportadas

---

## 🎯 Puntos Clave

1. **Separación Clara**: Cada compañía tiene sus propios processors
2. **Lógica Específica**: Las reglas de negocio están claramente definidas
3. **Flexibilidad**: Fácil modificación de reglas existentes
4. **Consistencia**: Misma interfaz para diferentes implementaciones
5. **Robustez**: Validaciones exhaustivas y manejo de casos edge

---

## 🔧 Formato de Respuesta API

El sistema implementa un formato de respuesta unicamente para las respuestas HTTP, este no se ve en la persistencia. El formato elegido se compone por:

1. **status**: Http Status, Numerico 
2. **message**: Mensage segun la peticion/error final 
3. **item**: objeto json correspondiente a la peticion ejecutada 
4. **errors**: objeto/array json con los errores en caso de body incompleto o con le formato incorrecto

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "BURGER KING",
        "country": "US",
        "bank": "Citigroup",
        "vendorStatus": "Verified"
    },
    "errors": null
}
```

---

## ⚙️ Rutas de Ejemplos

1. **📂 invoice**: `./example-request/invoice`
2. **📂 vendor**: `./example-request/vendor`

---

## ⚙️ Rutas de Consumo

1. **📂 invoice**: `http://localhost:3000/invoice/`\n
2. **📂 vendor**: `http://localhost:3000/vendor`\n

---

## ⚙️ Ruta de Persistencia

1 **📂 result.jsonl**: `db/result.jsonl`

---

## 🧾 Ejemplos de consumo/respuesta para vendors

1. **company-a-international-vendor.example**:

```json
{
    "company": "A",
    "vendorName": "Falabella",
    "country": "CO",
    "bank": "Bancolombia"
}
```

1. **company-a-international-vendor.example.api.response**:

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "Falabella",
        "country": "CO",
        "bank": "Bancolombia",
        "internationalBank": "Please confirm international bank details"
    },
    "errors": null
}
```

2. **company-a-local-vendor.example**:

```json
{
    "company": "A",
    "vendorName": "NIKE",
    "country": "US",
    "bank": "JPMorgan"
}
```

2. **company-a-local-vendor.example.api.response**:

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "NIKE",
        "country": "US",
        "bank": "JPMorgan"
    },
    "errors": null
}
```

3. **company-b-international-vendor.example**:

```json
{
    "company": "B",
    "vendorName": "ZARA",
    "country": "ESP",
    "bank": "Banco Santander "
}
```

3. **company-b-international-vendor.example.api.response**:

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "ZARA",
        "country": "ESP",
        "bank": "Banco Santander ",
        "vendorStatus": "Verified"
    },
    "errors": null
}
```

4. **company-b-local-vendor-with-missing-properties.example**:

```json
{
    "company": "B",
    "vendorName": "MCDONALDS",
    "country": "US",
    "bank": "Bank of America"
}
```

4. **company-b-local-vendor-with-missing-properties.example.api.response**:

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "MCDONALDS",
        "country": "US",
        "bank": "Bank of America",
        "vendorStatus": "Incomplete - missing registration/tax details"
    },
    "errors": null
}
```

5. **company-b-local-vendor.example**:

```json
{
    "company": "B",
    "vendorName": "BURGER KING",
    "country": "US",
    "bank": "Citigroup",
    "registrationNumber": "ORDER34715",
    "taxId": "TAX34715"
}
```

5. **company-b-local-vendor.example.api.response**:

```json
{
    "status": 200,
    "message": "success vendor transform",
    "item": {
        "vendorName": "BURGER KING",
        "country": "US",
        "bank": "Citigroup",
        "vendorStatus": "Verified"
    },
    "errors": null
}
```

## 🧾 Ejemplos de consumo/respuesta para Invoices

1. **company-a-invoice-alcohol.example**:

```json
{
    "company": "A",
    "invoiceId": "EXT4921",
    "invoiceDate": "2025-06-12",
    "lines": [
        { "description": "soda drinks", "amount": 1020.0 },
        { "description": "tequila - alcohol", "amount": 20000.0 }
    ]
}
```

1. **company-a-invoice-alcohol.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "ALC-001",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT4921",
        "lines": [
            {
                "description": "soda drinks",
                "amount": 1020
            },
            {
                "description": "tequila - alcohol",
                "amount": 20000
            }
        ]
    },
    "errors": null
}
```

2. **company-a-invoice-without-alcohol.example**:

```json
{
    "company": "A",
    "invoiceId": "EXT9127",
    "invoiceDate": "2025-06-12",
    "lines": [
        { "description": "soda drinks", "amount": 1020.0 },
        { "description": "chips", "amount": 20000.0 }
    ]
}
```

2. **company-a-invoice-without-alcohol.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "STD-001",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT9127",
        "lines": [
            {
                "description": "soda drinks",
                "amount": 1020
            },
            {
                "description": "chips",
                "amount": 20000
            }
        ]
    },
    "errors": null
}
```

3. **company-b-invoice-alcohol.example**:

```json
{
    "company": "B",
    "invoiceId": "EXT7887",
    "invoiceDate": "2025-06-12",
    "lines": [
        { "description": "apples", "amount": 120.0 },
        { "description": "beer - alcohol", "amount": 1000.0 }
    ]
}
```

3. **company-b-invoice-alcohol.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "ALC-B",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT7887",
        "lines": [
            {
                "description": "apples",
                "amount": 120
            },
            {
                "description": "beer - alcohol",
                "amount": 1000
            }
        ]
    },
    "errors": null
}
```

4. **company-b-invoice-tobacco.example**:

```json
{
    "company": "B",
    "invoiceId": "EXT659",
    "invoiceDate": "2025-06-12",
    "lines": [{ "description": "cuban cigars - tobacco", "amount": 1000.0 }]
}
```

4. **company-b-invoice-tobacco.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "TOB-B",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT659",
        "lines": [
            {
                "description": "cuban cigars - tobacco",
                "amount": 1000
            }
        ]
    },
    "errors": null
}
```

5. **company-b-invoice-with-alcohol-and-tobacco.example**:

```json
{
    "company": "B",
    "invoiceId": "EXT6579",
    "invoiceDate": "2025-06-12",
    "lines": [
        {
            "description": "cuban cigars - tobacco",
            "amount": 1000.0
        },
        {
            "description": "beer - alcohol",
            "amount": 1000.0
        }
    ]
}
```

5. **company-b-invoice-with-alcohol-and-tobacco.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "MULTI-B",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT6579",
        "lines": [
            {
                "description": "cuban cigars - tobacco",
                "amount": 1000
            },
            {
                "description": "beer - alcohol",
                "amount": 1000
            }
        ]
    },
    "errors": null
}
```

6. **company-b-invoice-without-alcohol-or-tobacco.example**:

```json
{
    "company": "B",
    "invoiceId": "EXT6559",
    "invoiceDate": "2025-06-12",
    "lines": [
        {
            "description": "egg candys",
            "amount": 1000.0
        },
        {
            "description": "gelatin gummies",
            "amount": 1000.0
        }
    ]
}
```

6. **company-b-invoice-without-alcohol-or-tobacco.example.api.response**:

```json
{
    "status": 200,
    "message": "success invoice transform",
    "item": {
        "account": "STD-B",
        "invoiceDate": "2025-06-12",
        "invoiceId": "EXT6559",
        "lines": [
            {
                "description": "egg candys",
                "amount": 1000
            },
            {
                "description": "gelatin gummies",
                "amount": 1000
            }
        ]
    },
    "errors": null
}
```
