### **Low-Level Language**
A **low-level language** is closer to **hardware and machine code**, offering minimal abstraction. It directly interacts with the computer's architecture, making it **fast and efficient** but **difficult to write and debug**.

#### **Characteristics**:
1. **Machine Oriented**: Directly tied to hardware (e.g., CPU instruction sets).
2. **Non-Portable**: Typically runs only on specific hardware.
3. **Fast Execution**: Highly efficient due to direct hardware control.
4. **Challenging to Code**: Requires deep understanding of architecture.

#### **Examples**:
1. **Machine Language**: Binary (e.g., `10101100`).
2. **Assembly Language**: Uses mnemonics (e.g., `MOV AX, BX`).

---

### **High-Level Language**
A **high-level language** is designed to be **human-readable** with high abstraction from hardware, making development easier. It uses **compilers or interpreters** to convert code into machine-readable instructions.

#### **Characteristics**:
1. **Human-Readable Syntax**: `print("Hello, World!")` (Python).
2. **Portable**: Runs on multiple platforms using compilers/interpreters.
3. **Easy Debugging**: Simple syntax improves maintenance.
4. **Slower Performance**: Requires translation to machine code.

#### **Examples**:
- General-purpose: Python, Java, C++.
- Domain-specific: SQL, HTML.

---

### **Java**
Java is a **high-level, object-oriented, platform-independent programming language** developed by Sun Microsystems (1995). It follows the **"Write Once, Run Anywhere" (WORA)** principle, compiling code into **bytecode** executed by the JVM (Java Virtual Machine).

---

#### **Key Features**:
1. **Object-Oriented**: Concepts like **Classes, Inheritance, Polymorphism**.
2. **Platform-Independent**: Runs on any device with a JVM.
3. **Robust**: Strong memory management with garbage collection.
4. **Secure**: JVM sandboxing, bytecode verification, and no explicit pointers.
5. **Multithreaded**: Supports concurrent execution of tasks.
6. **Rich APIs**: Networking, data structures, database connectivity, etc.

---

#### **Applications**:
1. **Enterprise Software** (e.g., Banking, Retail).
2. **Web Applications** (e.g., Spring Framework, JSP).
3. **Mobile Apps** (Android development).
4. **Big Data Tools** (Hadoop, Kafka).
5. **Cloud Computing** (AWS, Azure platforms).
6. **Embedded Systems** (IoT, smart cards).

---

#### **Advantages**:
- Platform-independence.
- Scalability and enterprise-readiness.
- Strong community support.
- Secure and reliable.

Java is widely used for its **simplicity, versatility**, and ability to build **robust applications** across industries—from web to enterprise software.

#### Where to Use Java?
- CPU Intensice applications 
- As Java is Multithreaded Language so we can use CPU More Efficient
- Like Node is simgle threaded it should be used for I/O intensive applications

## Java Fundamentals

### JDK (Java Development Kit)

### JVM

### JRE

### First Java Code

- Test.java

```java
public class Test{
    public static void main(String[] args){
        System.out.println("Hello");
    }
}
```

- Compile the code
```cmd
javac path/test.java
```
it will generate `Test.class` file

- execute the `Test.class` file
```cmd
java Test
```

- If you want to see the object file where machine intruction are there
```
javap -c Test
```

```
public class com.practical.Main {
  public com.practical.Main();
    Code:
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return

  public static void main(java.lang.String[]);
    Code:
         0: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #13                 // String Hello world!
         5: invokevirtual #15                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
}

```
These are Machine instrunction only JVM Can uderstand and called as byte code.

