# nest typeorm api 만들기

### class-validator

- yarn add class-validator

### PartialType

```typescript
PartialType(CreateProductInput)
@Field(() => String, {nullable: true})
```

### PickType

```typescript
PickType(CreateProductInput, ['name', 'price']);
```

### OmitType

```typescript
OmitType(CreateProductInput, ['description']);
```

### execptionFilter

- try catch 도구

---

- 배포할 때는 app.module에 db 싱크로 설정을 false로 하는 것이 좋다.
