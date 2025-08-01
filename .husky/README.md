# 🔄 Development Workflow with Husky

Este projeto utiliza o **Husky** para automatizar verificações de qualidade do código durante o processo de desenvolvimento.

## 🚀 Hooks Configurados

### Pre-commit Hook

Executado automaticamente antes de cada commit:

- **Lint-staged**: Aplica Biome lint e formatação apenas nos arquivos modificados
- **Type checking**: Verifica tipos TypeScript
- **Tests**: Executa todos os testes para garantir que nada foi quebrado

### Pre-push Hook

Executado automaticamente antes de cada push:

- **Full lint**: Executa verificação completa de lint em todo o projeto
- **Type checking**: Verificação de tipos em todo o projeto
- **All tests**: Executa todos os testes
- **Build verification**: Tenta compilar a biblioteca para garantir que ela builda corretamente

### Commit-msg Hook

Valida mensagens de commit:

- **Minimum length**: Mensagens devem ter pelo menos 10 caracteres
- **Suggestions**: Encoraja o uso de conventional commits

## 🛠️ Comandos Úteis

```bash
# Testar manualmente o que o pre-commit hook faria
pnpm husky:test

# Executar apenas lint-staged (formatação e lint nos arquivos staged)
pnpm lint-staged

# Verificar tipos manualmente
pnpm typecheck

# Executar todos os testes
pnpm test --run
```

## 📝 Boas Práticas de Commit

### Conventional Commits

Recomendamos usar conventional commits para melhor organização:

```bash
# Features
git commit -m "feat: add new social network detection for Discord"

# Bug fixes
git commit -m "fix: resolve URL validation issue with special characters"

# Documentation
git commit -m "docs: update README with new usage examples"

# Refactoring
git commit -m "refactor: optimize hook performance with useMemo"

# Tests
git commit -m "test: add comprehensive tests for new detection patterns"

# Chores
git commit -m "chore: update dependencies to latest versions"
```

### Fluxo de Desenvolvimento

1. **Faça suas alterações**
2. **Adicione ao staging**: `git add .`
3. **Commit**: `git commit -m "feat: sua mensagem aqui"`
   - ✅ Husky executará automaticamente lint, formatação e testes
4. **Push**: `git push`
   - ✅ Husky executará verificações completas antes do push

## 🚫 Contornando Hooks (Use com Cuidado)

Se por algum motivo você precisar pular os hooks:

```bash
# Pular pre-commit hook
git commit --no-verify -m "mensagem"

# Pular pre-push hook
git push --no-verify
```

**⚠️ Atenção**: Use `--no-verify` apenas em situações excepcionais!

## 🔧 Configuração do Lint-staged

Os arquivos são processados da seguinte forma:

- **TypeScript/JavaScript** (`*.{ts,tsx,js,jsx}`):

  - `biome check --write` (lint + auto-fix)
  - `biome format --write` (formatação)

- **JSON/Markdown** (`*.{json,md}`):
  - `biome format --write` (formatação)

## 🎯 Benefícios

- ✅ **Qualidade consistente**: Todo código é verificado antes de ser commitado
- ✅ **Prevenção de bugs**: Testes executados automaticamente
- ✅ **Formatação uniforme**: Biome garante estilo consistente
- ✅ **Builds confiáveis**: Verificação de build antes do push
- ✅ **Commits organizados**: Validação de mensagens de commit

---

**💡 Dica**: Se você está começando no projeto, execute `pnpm husky:test` para verificar se tudo está funcionando corretamente!
