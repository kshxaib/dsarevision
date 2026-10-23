export const oopsVault = {
  id: 'oops',
  title: 'Object-Oriented Programming',
  shortTitle: 'OOPs',
  category: 'Core CS',
  icon: 'Boxes',
  accentColor: '#A855F7', // purple-500
  description: '4 Core Pillars, SOLID Principles, Design Patterns (Singleton, Factory, Observer, Strategy), Overloading vs Overriding, and Composition vs Inheritance.',
  tags: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction', 'SOLID', 'Design Patterns'],
  questions: [
    {
      id: 'oops-q1',
      number: '01',
      topic: 'Core Pillars',
      question: 'Explain the 4 Core Pillars of OOP with real-world examples.',
      interviewTips: 'Keep definitions concise and highlight how each pillar solves real-world maintainability.',
      answer: `1. Encapsulation ("Data Hiding & Bundling"):
   - Bundling state (data variables) and behavior (methods) together into a single unit (class), restricting direct access to internal components using access modifiers (private, protected).
   - Real-world: A capsule containing medicine ingredients; getters/setters control access.

2. Abstraction ("Hiding Complexity"):
   - Showing only essential features of an object while hiding background implementation details.
   - Implemented via abstract classes and interfaces.
   - Real-world: Car accelerator pedal; driver pushes pedal without needing to know engine fuel injection physics.

3. Inheritance ("Code Reusability & IS-A Relationship"):
   - Mechanism where a subclass inherits fields and methods from a superclass.
   - Example: Dog IS-A Animal; Dog inherits eat() and adds bark().

4. Polymorphism ("Many Forms"):
   - Ability of a message, method, or object to take multiple forms.
   - Compile-Time (Static): Method Overloading (same name, different parameter signature).
   - Runtime (Dynamic): Method Overriding (subclass provides specific implementation of superclass method; resolved via dynamic method dispatch / vtable).`
    },
    {
      id: 'oops-q2',
      number: '02',
      topic: 'SOLID Principles',
      question: 'Explain the 5 SOLID Principles of Object-Oriented Design.',
      interviewTips: 'Recite each letter clearly with the problem it prevents.',
      answer: `• S - Single Responsibility Principle (SRP):
  - A class should have one, and only one, reason to change.
  - Bad: A UserService class that registers users AND sends emails AND generates PDF reports.
  - Good: Separate into UserService, EmailService, and ReportGenerator.

• O - Open/Closed Principle (OCP):
  - Software entities should be open for extension, but closed for modification.
  - Add new features by writing new subclasses or strategy implementations, not by altering existing tested code.

• L - Liskov Substitution Principle (LSP):
  - Subtypes must be substitutable for their base types without altering program correctness.
  - Classic violation: Square inheriting from Rectangle (setting Square width breaks height expectation).

• I - Interface Segregation Principle (ISP):
  - Clients should not be forced to depend upon interfaces they do not use.
  - Break monolithic interfaces into smaller, role-specific interfaces.

• D - Dependency Inversion Principle (DIP):
  - High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).
  - Do not instantiate dependencies directly with 'new'; inject them (Constructor Injection).`
    },
    {
      id: 'oops-q3',
      number: '03',
      topic: 'Design Patterns',
      question: 'Explain common Gang of Four (GoF) Design Patterns: Singleton, Factory, and Observer.',
      interviewTips: 'For Singleton, mention thread-safety (Double-Checked Locking or Bill Pugh Singleton in Java).',
      answer: `• Singleton Pattern (Creational):
  - Ensures a class has only one instance and provides a global access point to it (e.g. Database connection pool, Logger).
  - Implementation: Private constructor, private static instance, public static getInstance() method.

• Factory Method Pattern (Creational):
  - Defines an interface or abstract method for creating an object, but lets subclasses decide which class to instantiate.
  - Decouples client code from concrete product classes (e.g., NotificationFactory.create("SMS" | "EMAIL")).

• Observer Pattern (Behavioral):
  - Defines a 1-to-many dependency where when one object changes state, all its registered dependents are notified automatically.
  - Used in: Event-driven systems, Pub/Sub, Redux, DOM event listeners.`
    },
    {
      id: 'oops-q4',
      number: '04',
      topic: 'Architecture Principles',
      question: 'Composition vs Inheritance: Why is Composition preferred ("Favor composition over inheritance")?',
      interviewTips: 'Inheritance violates encapsulation because subclasses depend on superclass internal details (fragile base class problem).',
      answer: `• Inheritance (IS-A Relationship):
  - Subclass is tightly coupled to superclass implementation.
  - Changes in base class can unintentionally break subclasses across the codebase.
  - Cannot change inherited behavior dynamically at runtime.

• Composition (HAS-A Relationship):
  - Class references interfaces or instances of other classes to gain functionality.
  - Loose coupling: Components can be swapped dynamically at runtime (Strategy Pattern).
  - Easier to unit test via mocking and avoids diamond problem/multiple inheritance issues.`
    }
  ]
};
