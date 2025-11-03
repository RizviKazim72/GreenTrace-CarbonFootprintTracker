# ⚙️ Backend Development - GreenTrace 2.0

## 📚 Course Overview
Ye document GreenTrace 2.0 ke **Backend Development** ka complete guide hai. Server-side development, APIs, database, security - sab kuch detail mein covered hai.

---

## 🛠️ Technology Stack

### Core Framework
**Spring Boot 3.5.7** - Enterprise-grade Java framework
- Latest stable version
- Production-ready features
- Auto-configuration
- Embedded server (Tomcat)

### Programming Language
**Java 21** - Latest LTS (Long Term Support) version
- Modern Java features
- Records, Pattern Matching
- Virtual Threads support
- Better performance

### Database
**MySQL** - Relational Database Management System
- Structured data storage
- ACID compliance
- Powerful querying
- Scalable & reliable

---

## 🏗️ Project Architecture

### Folder Structure
```
server/
├── src/
│   ├── main/
│   │   ├── java/com/greentrace/greentrace/
│   │   │   ├── GreentraceApplication.java    # Main entry point
│   │   │   ├── controller/                   # REST Controllers
│   │   │   ├── service/                      # Business Logic
│   │   │   ├── repository/                   # Data Access Layer
│   │   │   ├── model/                        # Entity classes
│   │   │   ├── dto/                          # Data Transfer Objects
│   │   │   ├── config/                       # Configuration classes
│   │   │   ├── security/                     # Security configs
│   │   │   └── exception/                    # Exception handling
│   │   └── resources/
│   │       ├── application.properties        # App configuration
│   │       ├── static/                       # Static files
│   │       └── templates/                    # HTML templates
│   └── test/                                 # Unit tests
├── pom.xml                                   # Maven dependencies
├── mvnw & mvnw.cmd                          # Maven wrapper
└── target/                                   # Compiled classes
```

### Layered Architecture
```
┌─────────────────────────────┐
│   Controller Layer          │  → REST APIs, Request handling
├─────────────────────────────┤
│   Service Layer             │  → Business logic
├─────────────────────────────┤
│   Repository Layer          │  → Database operations
├─────────────────────────────┤
│   Database (MySQL)          │  → Data storage
└─────────────────────────────┘
```

---

## 📦 Dependencies & Their Purpose

### Spring Boot Starters

#### 1. **spring-boot-starter-web**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
**Purpose:**
- REST API development
- Embedded Tomcat server
- Spring MVC framework
- JSON serialization/deserialization
- HTTP request handling

#### 2. **spring-boot-starter-data-jpa**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
**Purpose:**
- Database operations
- Hibernate ORM integration
- JPA (Java Persistence API)
- Repository pattern
- Query methods
- Entity management

#### 3. **spring-boot-starter-security**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
**Purpose:**
- Authentication & Authorization
- Password encryption
- Security filters
- JWT token handling
- Role-based access control
- CSRF protection

#### 4. **spring-boot-devtools**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```
**Purpose:**
- Auto-restart on code changes
- LiveReload support
- Faster development
- Property defaults
- Better debugging

#### 5. **mysql-connector-j**
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```
**Purpose:**
- MySQL database connectivity
- JDBC driver
- Connection pooling
- SQL execution

#### 6. **lombok**
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```
**Purpose:**
- Boilerplate code reduction
- Auto-generate getters/setters
- @Data, @Builder annotations
- @Slf4j for logging
- Cleaner code

#### 7. **spring-boot-starter-test**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```
**Purpose:**
- Unit testing
- Integration testing
- JUnit 5
- Mockito
- AssertJ

---

## 🎯 Core Concepts

### 1. **Spring Boot Framework**

#### Auto-Configuration
- Automatic bean configuration
- Convention over configuration
- Minimal setup required
- Smart defaults

#### Dependency Injection (DI)
```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```
- Loose coupling
- Easy testing
- Better maintainability

#### Inversion of Control (IoC)
- Spring container manages objects
- Lifecycle management
- Dependency resolution

### 2. **RESTful API Development**

#### REST Principles
- **Stateless**: Har request independent hai
- **Resource-based**: URLs resources represent karte hain
- **HTTP Methods**: GET, POST, PUT, DELETE
- **JSON Format**: Data exchange format

#### Controller Example
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> getAllUsers() { }
    
    @PostMapping
    public User createUser(@RequestBody User user) { }
    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id) { }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) { }
}
```

#### HTTP Status Codes
- **200 OK** - Successful GET/PUT
- **201 Created** - Successful POST
- **204 No Content** - Successful DELETE
- **400 Bad Request** - Invalid data
- **401 Unauthorized** - Authentication required
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

### 3. **JPA & Hibernate**

#### Entity Class
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true)
    private String email;
}
```

#### Repository Interface
```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContaining(String name);
}
```

**JpaRepository Features:**
- save(), findById(), findAll()
- deleteById(), count()
- Custom query methods
- Pagination & Sorting

#### ORM Benefits
- No SQL queries likhni padti
- Object-oriented approach
- Database independence
- Automatic table creation

### 4. **Spring Security**

#### Authentication
- User identity verification
- Login mechanism
- Password encryption (BCrypt)
- Session management

#### Authorization
- Role-based access control
- Method-level security
- URL-based security
- Permission checks

#### Security Configuration
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin()
            .and()
            .httpBasic();
        return http.build();
    }
}
```

#### Password Encryption
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### 5. **Service Layer Pattern**

#### Business Logic
```java
@Service
@Slf4j
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public User createUser(UserDTO userDTO) {
        // Validation
        // Business logic
        // Database save
        // Return result
    }
}
```

**Benefits:**
- Separation of concerns
- Reusable business logic
- Transaction management
- Easy testing

### 6. **Exception Handling**

#### Global Exception Handler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound() {
        // Handle 404 errors
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral() {
        // Handle all other errors
    }
}
```

---

## 🗄️ Database Design

### MySQL Configuration
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/greentrace
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Schema Management
- **create**: Drop & create tables
- **update**: Update schema (recommended)
- **validate**: Validate schema
- **none**: No action

### Database Features
- **Transactions**: ACID compliance
- **Relationships**: One-to-Many, Many-to-Many
- **Indexes**: Performance optimization
- **Constraints**: Data integrity

---

## 🔐 Security Implementation

### 1. **Password Security**
- BCrypt hashing algorithm
- Salt automatically generated
- One-way encryption
- Brute-force resistant

### 2. **Authentication Flow**
1. User login credentials bhejta hai
2. Security filter intercept karta hai
3. Database se user details fetch
4. Password verify (BCrypt)
5. Session/Token generate
6. Authenticated user access milta hai

### 3. **Authorization**
```java
@PreAuthorize("hasRole('ADMIN')")
public void adminOnlyMethod() { }

@PreAuthorize("hasRole('USER')")
public void userMethod() { }
```

### 4. **CORS Configuration**
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        // Frontend se backend call enable karna
    }
}
```

---

## 🚀 Application Startup

### Main Application Class
```java
@SpringBootApplication
public class GreentraceApplication {
    public static void main(String[] args) {
        SpringApplication.run(GreentraceApplication.class, args);
    }
}
```

**@SpringBootApplication includes:**
- @Configuration
- @EnableAutoConfiguration
- @ComponentScan

### Startup Process
1. JAR execution start
2. Spring context initialization
3. Beans creation & injection
4. Database connection establish
5. Tomcat server start
6. Application ready (default port 8080)

---

## 📊 Maven Build Tool

### pom.xml Structure
```xml
<project>
    <parent>               <!-- Spring Boot parent -->
    <groupId>              <!-- Project group -->
    <artifactId>           <!-- Project name -->
    <version>              <!-- Version -->
    <dependencies>         <!-- Libraries -->
    <build>                <!-- Build configuration -->
</project>
```

### Maven Commands
```bash
./mvnw clean           # Clean target folder
./mvnw compile         # Compile code
./mvnw test            # Run tests
./mvnw package         # Create JAR
./mvnw spring-boot:run # Run application
```

### Maven Lifecycle
1. **validate** - Project correct hai ya nahi
2. **compile** - Source code compile
3. **test** - Unit tests run
4. **package** - JAR/WAR create
5. **install** - Local repository mein install
6. **deploy** - Remote repository mein deploy

---

## 🔄 Development Workflow

### 1. **Entity Creation**
```java
@Entity → Database table
```

### 2. **Repository Interface**
```java
JpaRepository → CRUD operations
```

### 3. **Service Class**
```java
@Service → Business logic
```

### 4. **Controller**
```java
@RestController → REST endpoints
```

### 5. **Testing**
```java
@Test → Unit/Integration tests
```

---

## 🎯 API Design Best Practices

### 1. **RESTful URLs**
```
GET    /api/users           # Get all users
GET    /api/users/{id}      # Get single user
POST   /api/users           # Create user
PUT    /api/users/{id}      # Update user
DELETE /api/users/{id}      # Delete user
```

### 2. **Request/Response Format**
```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com"
}

// Response
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T10:00:00"
}
```

### 3. **Error Response**
```json
{
  "timestamp": "2024-01-01T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid email format"
}
```

### 4. **Validation**
```java
@NotNull
@Email
@Size(min = 3, max = 50)
private String email;
```

---

## 🧪 Testing Strategy

### Unit Tests
```java
@Test
public void testCreateUser() {
    User user = new User();
    when(repository.save(any())).thenReturn(user);
    // Test logic
}
```

### Integration Tests
```java
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    // Test APIs
}
```

---

## 🎓 Viva Questions & Answers

### Q1: Spring Boot kyon use kiya?
**A:** Spring Boot enterprise-grade framework hai, auto-configuration hai, production-ready features hain, aur development fast hai. Boilerplate code kam hai.

### Q2: JPA aur Hibernate ka difference?
**A:** JPA specification hai (interface), Hibernate uska implementation hai. JPA standard hai, Hibernate ORM tool hai.

### Q3: REST API kya hai?
**A:** Representational State Transfer - web services banane ka architecture. HTTP methods use karke resources ko access/modify karte hain.

### Q4: Dependency Injection ke fayde?
**A:** Loose coupling, easy testing, maintainable code, aur flexible architecture.

### Q5: Spring Security kaise kaam karta hai?
**A:** Filter chain use karke requests ko intercept karta hai, authentication check karta hai, authorization verify karta hai.

### Q6: @RestController aur @Controller mein difference?
**A:** @RestController automatically @ResponseBody add karta hai, directly JSON return karta hai. @Controller views return karta hai.

### Q7: @Transactional ka use kya hai?
**A:** Database transactions manage karta hai. Agar error aaye to rollback hota hai, success pe commit hota hai.

### Q8: Lombok kyon use kiya?
**A:** Boilerplate code (getters, setters, constructors) automatically generate karta hai. Code clean aur readable hota hai.

### Q9: Maven ka purpose?
**A:** Dependency management, build automation, project management. pom.xml se sab dependencies download hoti hain.

### Q10: HTTP methods ka use?
**A:** GET (fetch), POST (create), PUT (update), DELETE (remove), PATCH (partial update).

### Q11: Repository layer ki zaroorat kyon?
**A:** Database operations ko separate karta hai, testing easy hai, aur code reusable hota hai.

### Q12: BCrypt kya hai?
**A:** Password hashing algorithm. Secure, one-way encryption, salt automatically add karta hai.

---

## 📈 Performance Optimization

### 1. **Database Indexing**
```java
@Table(indexes = @Index(columnList = "email"))
```

### 2. **Caching**
```java
@Cacheable("users")
public User getUser(Long id) { }
```

### 3. **Connection Pooling**
```properties
spring.datasource.hikari.maximum-pool-size=10
```

### 4. **Lazy Loading**
```java
@OneToMany(fetch = FetchType.LAZY)
```

---

## 🔮 Future Enhancements

### Planned Features
1. **JWT Authentication** - Token-based auth
2. **Redis Caching** - Performance boost
3. **Microservices** - Service decomposition
4. **Docker** - Containerization
5. **Swagger** - API documentation
6. **Logging** - Log4j2/Logback
7. **Monitoring** - Actuator endpoints
8. **Message Queue** - RabbitMQ/Kafka

---

## 📊 Project Stats

- **Spring Boot**: 3.5.7
- **Java Version**: 21 (LTS)
- **Database**: MySQL
- **Build Tool**: Maven
- **Server**: Embedded Tomcat
- **Architecture**: Layered (MVC)

---

## 🎯 Learning Outcomes

Backend development se aapne ye skills learn kiye:

1. ✅ Spring Boot framework
2. ✅ RESTful API development
3. ✅ JPA & Hibernate ORM
4. ✅ Spring Security
5. ✅ MySQL database
6. ✅ Maven build tool
7. ✅ Layered architecture
8. ✅ Exception handling
9. ✅ Testing strategies
10. ✅ API design best practices

---

## 📝 Summary

**GreenTrace 2.0** ka backend Spring Boot 3.5.7 aur Java 21 pe based hai. Layered architecture follow karta hai - Controller, Service, Repository. Spring Security se authentication/authorization hai. MySQL database use hai with JPA/Hibernate. Maven build tool se dependency management hai. Production-ready, scalable, aur secure backend!

---

**Made with 💚 for GreenTrace 2.0**
