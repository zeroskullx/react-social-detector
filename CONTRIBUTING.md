# Contributing to React Social Detector

Thank you for your interest in contributing to React Social Detector! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended package manager)

### Setting up the development environment

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-social-detector.git
   cd react-social-detector
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

## 🔧 Development Workflow

### Running tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Building the project

```bash
# Build for production
pnpm build

# Clean build artifacts
pnpm clean
```

### Development server

```bash
# Start Next.js development server (for demo)
pnpm dev
```

## 📝 Contribution Guidelines

### Adding new social networks

1. **Update patterns**: Add detection patterns in `src/react-social-detector/patterns.ts`
2. **Add tests**: Create comprehensive tests in `src/react-social-detector/__tests__/`
3. **Update documentation**: Add the new platform to the README.md supported platforms list

### Code style

- Use TypeScript with strict mode
- Follow existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Testing requirements

- All new features must include tests
- Maintain test coverage above 90%
- Test both positive and negative cases
- Include edge cases in your tests

### Commit messages

Use conventional commit format:

```text
feat: add support for new social network
fix: resolve URL validation issue
docs: update README with new examples
test: add edge case tests for YouTube detection
```

Types:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the problem
2. **Steps to reproduce**: Step-by-step instructions
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: OS, Node.js version, package version
6. **Code examples**: Minimal reproducible example

## 🔍 Adding Detection Patterns

### Pattern structure

```typescript
export const PLATFORM_PATTERNS: SocialNetworkPattern = {
  name: "Platform Name",
  domains: ["example.com", "www.example.com"],
  patterns: [
    /^https?:\/\/(www\.)?example\.com\/user\/[\w.-]+$/i,
    /^https?:\/\/(www\.)?example\.com\/profile\/[\w.-]+$/i,
  ],
  examples: [
    "https://example.com/user/username",
    "https://www.example.com/profile/userprofile",
  ],
};
```

### Testing patterns

```typescript
describe("Platform Name detection", () => {
  it("should detect valid Platform Name URLs", () => {
    const urls = [
      "https://example.com/user/testuser",
      "https://www.example.com/profile/testprofile",
    ];

    urls.forEach((url) => {
      expect(quickReactSocialDetector(url)?.name).toBe("Platform Name");
    });
  });

  it("should not detect invalid URLs", () => {
    const invalidUrls = ["https://example.com", "https://example.com/invalid"];

    invalidUrls.forEach((url) => {
      expect(quickReactSocialDetector(url)).toBeNull();
    });
  });
});
```

## 📦 Pull Request Process

1. **Create a branch**: Use descriptive branch names

   ```bash
   git checkout -b feat/add-mastodon-support
   ```

2. **Make changes**: Follow the contribution guidelines

3. **Test your changes**: Ensure all tests pass

   ```bash
   pnpm test
   ```

4. **Update documentation**: Update README if needed

5. **Commit your changes**: Use conventional commit format

6. **Push and create PR**:
   - Push to your fork
   - Create a pull request with a clear title and description
   - Reference any related issues

### PR requirements

- [ ] Tests pass
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or clearly documented)
- [ ] Follows code style guidelines
- [ ] Includes appropriate tests

## 🤝 Code of Conduct

This project follows a Code of Conduct. Please be respectful and constructive in all interactions.

### Our standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 📄 License

By contributing to React Social Detector, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

If you have questions about contributing, feel free to:

- Open an issue for discussion
- Check existing issues and discussions
- Reach out to the maintainers

Thank you for contributing! 🎉
