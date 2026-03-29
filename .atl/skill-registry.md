# Skill Registry - my-app (Expo Mobile)

## Project Context
- **Stack**: Expo SDK 51, React Native 0.74, Redux Toolkit, React Navigation
- **Architecture**: Redux slices + React hooks
- **Testing**: Jest, jest-expo

## Available Skills (User-level)

| Skill | Trigger | Description |
|-------|---------|-------------|
| sdd-init | "sdd init", "iniciar sdd" | Initialize SDD context |
| sdd-explore | "/sdd-explore" | Explore and investigate ideas |
| sdd-propose | "/sdd-new", "/sdd-propose" | Create change proposal |
| sdd-spec | "/sdd-spec" | Write specifications |
| sdd-design | "/sdd-design" | Create technical design |
| sdd-tasks | "/sdd-tasks" | Break down into tasks |
| sdd-apply | "/sdd-apply" | Implement tasks |
| sdd-verify | "/sdd-verify" | Validate implementation |
| sdd-archive | "/sdd-archive" | Archive completed change |

## Project Conventions
- Views en `Views/`
- Styles en `Styles/`
- Redux slices en `components/Features/`
- Services en `components/App/Service/`
- Tests en `__tests__/`
- Mocks en `__mocks__/`