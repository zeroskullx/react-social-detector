# 📝 Como Manter o CHANGELOG.md

## Estrutura do CHANGELOG

O arquivo CHANGELOG.md segue o padrão [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) e [Semantic Versioning](https://semver.org/).

### Estrutura Básica:

```markdown
# Changelog

## [Unreleased]

### Added

- Novas funcionalidades que ainda não foram lançadas

### Changed

- Mudanças em funcionalidades existentes

### Deprecated

- Funcionalidades que serão removidas em versões futuras

### Removed

- Funcionalidades removidas

### Fixed

- Correções de bugs

### Security

- Correções de segurança

## [1.0.2] - 2025-08-XX

### Fixed

- Correção de bug X

## [1.0.1] - 2025-08-01

### Published

- Primeira publicação no NPM
```

## Tipos de Mudanças

### Added (Adicionado)

- ✅ Novas funcionalidades
- ✅ Novos endpoints/métodos
- ✅ Nova documentação

### Changed (Alterado)

- 🔄 Mudanças em funcionalidades existentes
- 🔄 Melhorias de performance
- 🔄 Atualizações de dependências

### Deprecated (Descontinuado)

- ⚠️ Funcionalidades que serão removidas
- ⚠️ APIs antigas

### Removed (Removido)

- 🗑️ Funcionalidades removidas
- 🗑️ APIs descontinuadas

### Fixed (Corrigido)

- 🐛 Correções de bugs
- 🐛 Correções de comportamento

### Security (Segurança)

- 🔒 Correções de vulnerabilidades
- 🔒 Melhorias de segurança

## Versionamento Semântico

### MAJOR.MINOR.PATCH (ex: 1.2.3)

- **MAJOR** (1.x.x): Mudanças que quebram compatibilidade
- **MINOR** (x.1.x): Novas funcionalidades compatíveis
- **PATCH** (x.x.1): Correções de bugs compatíveis

## Exemplos de Futuras Versões

### Para Versão 1.0.2 (Patch - Bug Fix)

```markdown
## [1.0.2] - 2025-08-05

### Fixed

- Correção na detecção de URLs do TikTok com parâmetros especiais
- Fix no hook useReactSocialDetector para URLs inválidas
```

### Para Versão 1.1.0 (Minor - Nova Funcionalidade)

```markdown
## [1.1.0] - 2025-08-15

### Added

- Suporte para 5 novas plataformas sociais
- Nova função `getNetworkMetadata()` para obter metadados das redes
- Função de cache configurável

### Changed

- Melhorias de performance na detecção em lote
- Documentação expandida com mais exemplos
```

### Para Versão 2.0.0 (Major - Breaking Changes)

```markdown
## [2.0.0] - 2025-09-01

### Added

- Nova API redesenhada com melhor TypeScript
- Suporte para React 19

### Changed

- **BREAKING**: Renomeação da função `quickReactSocialDetector` para `detectSocial`
- **BREAKING**: Nova estrutura de retorno dos objetos

### Removed

- **BREAKING**: Removido suporte para React 17
- **BREAKING**: Removidas funções deprecated da v1.x

### Migration Guide

- Para migrar da v1.x para v2.0:
  - Substitua `quickReactSocialDetector` por `detectSocial`
  - Atualize React para versão 18+
```

## Fluxo de Trabalho

### 1. Durante o Desenvolvimento

Adicione mudanças na seção `[Unreleased]`:

```markdown
## [Unreleased]

### Added

- Nova função para detectar redes sociais profissionais

### Fixed

- Correção na detecção de URLs do Instagram
```

### 2. Antes do Release

1. Mova as mudanças de `[Unreleased]` para uma nova versão
2. Adicione a data do release
3. Atualize a versão no package.json
4. Commit e crie uma tag

### 3. Exemplo de Commit

```bash
# Atualizar versão
pnpm version patch  # ou minor, major

# Commit do changelog
git add CHANGELOG.md package.json
git commit -m "chore(release): v1.0.2"

# Criar tag
git tag v1.0.2

# Push
git push origin main --tags
```

## Boas Práticas

### ✅ Faça

- Mantenha o formato consistente
- Use datas no formato YYYY-MM-DD
- Seja específico nas descrições
- Agrupe mudanças por tipo
- Inclua links para issues/PRs quando relevante

### ❌ Não Faça

- Não use linguagem técnica demais
- Não esqueça de atualizar antes do release
- Não remova versões antigas
- Não use datas relativas ("ontem", "semana passada")

## Links Úteis

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
