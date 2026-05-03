# Cách sử dụng các tham số của Swagger

## Tham Số của Response
- Cú pháp: 
```
#[OA\Response(...)]
```
- response: string — mã response.
- description: string — mô tả.
- content: 
    + OA\JsonContent — nội dung response.
    + OA\XmlContent — nội dung response XML.
    + OA\Schema — nội dung response schema.
- headers: các header trả về, dùng #[OA\Header(...)]
- links: các link trả về, dùng #[OA\Link(...)].
- $ref: string — tham chiếu schema.

## Tham Số của JsonContent
- Cú pháp: 
```
#[OA\JsonContent(...)]
```
### Khai báo kiểu & tham chiếu:
- ref: new Model(type: ...) hoặc ref: "#/components/schemas/..."
- type: string — kiểu: string|integer|number|boolean|array|object.
### Mô tả & ví dụ
- description: mô tả schema
- example: 1 ví dụ JSON
- examples: nhiều ví dụ (ít dùng hơn, thường đặt ở OA\MediaType)
- default: giá trị mặc định
### Ràng buộc & validation (JSON Schema)
- required: {"fieldA","fieldB"} (chỉ áp dụng với type="object")
- enum: {"A","B","C"}
- format: "uuid" | "date" | "date-time" | "email" | ..."
- nullable: true|false
- deprecated, readOnly, writeOnly: cờ meta
- Số: minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf
- Chuỗi: minLength, maxLength, pattern
- Mảng: minItems, maxItems, uniqueItems, items=...
- Object: minProperties, maxProperties, additionalProperties=true|false|OA\Schema(...)
### Cấu trúc con
- properties={ new OA\Property(...), ... } (khi type="object")
- items= new OA\Items(...) | new OA\Schema(...) (khi type="array")
- discriminator: dùng cho kế thừa/đa hình (polymorphism)
- xml, externalDocs: ít dùng trong JSON

## Tham Số của Property
- Cú pháp: 
```
#[OA\Property(...)]
```
- property: string — tên field.
- description: string — mô tả.
- type: string — kiểu: string|integer|number|boolean|array|object.
- format: string — định dạng: uuid|email|date-time|int64|float|…
- nullable: bool — cho phép null.
- readOnly: bool — chỉ xuất trong response.
- writeOnly: bool — chỉ chấp nhận trong request.
- deprecated: bool — đã lỗi thời.
- example: mixed — ví dụ 1 giá trị.
- enum: array — liệt kê giá trị hợp lệ.
- default: mixed — giá trị mặc định (chủ yếu để mô tả).