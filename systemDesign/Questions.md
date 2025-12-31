# Questions

1. How do I decide when to split a monolith into services?

2. How does a request flow end-to-end through a production system?

3. How do I design a service that can handle 10x more traffic with minimal changes?

4. What are the real trade-offs between vertical and horizontal scaling?

5. How do I choose between synchronous and asynchronous communication?

6. When should I use a queue vs direct RPC?

7. How do I design for backpressure in a high-traffic system?

8. How do I protect downstream services from traffic spikes?

9. How do I design APIs so they can evolve without breaking clients?

10. How do I handle idempotency for write APIs?

➤ Data Modeling, Storage & Indexing

11. How do I model data differently for OLTP vs OLAP workloads?

12. How do I decide between SQL, NoSQL, and search engines?

13. How do I shard data — by user, tenant, region, or something else?

14. What does a good partition key look like in a distributed store?

15. How do I avoid hot partitions and skew?

16. How should I index for read-heavy vs write-heavy workloads?

17. How do I design soft delete, archival, and retention?

18. How do I handle multi-tenant data isolation?

19. How do I design a migration strategy for a huge table?

20. How do I safely backfill data in production?

➤ Caching & Performance

21. Where should I cache — client, edge, service, DB layer?

22. How do I pick between write-through, write-back, and write-around caching?

23. How do I design cache invalidation rules that don’t become a nightmare?

24. How do I handle cache stampede and thundering herd?

25. What is my caching story for hot keys and large objects?

26. How do I measure whether a cache is actually helping?

27. How do I design pagination for massive datasets efficiently?

28. How do I design rate limiting that doesn’t break good users?

➤ Consistency, Availability & Transactions

29. When do I accept eventual consistency vs strict consistency?

30. How do I model consistency levels across services and data stores?

31. How do I implement distributed transactions without 2PC pain?

32. How do I design an outbox/inbox pattern for reliable events?

33. How do I handle “read your own writes” in a distributed system?

34. How do I reconcile divergent data across systems?

35. How do I design id generation that works across regions?

36. How do I reason about CAP trade-offs for a given product requirement?

37. How do I design strong ordering guarantees where they really matter?

➤ Reliability, Failures & Recovery

38. What are all the ways my system can fail under real traffic?

39. How do I design for graceful degradation instead of hard failure?

40. How do I implement retries without causing storms and loops?

41. How do I design circuit breakers and bulkheads correctly?

42. How do I run in multiple regions and fail over cleanly?

43. How do I design for data center outage scenarios?

44. How do I do schema changes without downtime?

45. How do I design a rollback strategy for bad releases?

Become a member
46. How do I make “rebuild from scratch” possible if everything is lost?

47. How do I define SLOs and design around them?

➤ Async Processing, Events & Jobs

48. When do I choose event-driven over request-response?

49. How do I design an event schema that can evolve safely?

50. How do I handle exactly-once vs at-least-once semantics in practice?

51. How do I design a job scheduler for millions of jobs/day?

52. How do I track the status of long-running jobs for users?

53. How do I design dead-letter queues and retry policies?

54. How do I avoid processing the same event forever due to poison messages?

55. How do I design a fan-out/fan-in pipeline for heavy computations?

56. How do I handle ordering of events when it matters?

➤ APIs, Boundaries & Contracts

57. How do I define clear boundaries between services?

58. How do I design versioning for public APIs?

59. How do I design tenant-level rate limits and quotas?

60. How do I handle partial failures in multi-service calls?

61. How do I design a gateway that can evolve independently of services?

62. How do I design for backward compatibility when schemas change?

63. How do I handle “breaking change” scenarios with minimal disruption?

64. How do I design a safe deprecation process?

➤ Observability, Monitoring & Operations

65. What should I log at each layer — and what should I never log?

66. How do I design tracing across 50+ microservices?

67. How do I design metrics that actually tell me system health?

68. How do I design alerting that catches real issues but avoids noise?

69. How do I debug high tail latency in a distributed system?

70. How do I design dashboards that help during incidents?

71. How do I design runbooks so on-call engineers can act fast?

72. How do I simulate failures before they hit production?

➤ Evolution, Cost & Real-World Trade-offs

73. How do I design something MVP-first that can still grow?

74. How do I choose between building a platform vs a one-off service?

75. How do I design for cost visibility and optimization from day one?

76. How do I decide what to buy vs what to build?

77. How do I design systems that multiple teams can safely extend?

78. How do I design for backward compatibility with older clients?

79. How do I plan for data residency and regional regulations?

80. How do I design to support experiments (A/B tests, flags) cleanly?

81. How do I design migration paths when the legacy system can’t just die?

➤ People, Reviews & High-Level Thinking

82. How do I explain my design to a junior dev so they truly get it?

83. How do I defend trade-offs to a sceptical architect?

84. How do I simplify a complex design without losing guarantees?

85. How do I write a design doc that survives 3 years of evolution?

86. How do I review someone else’s design deeply but respectfully?

87. How do I know when a design is over-engineered?

88. How do I know when a design is dangerously under-engineered?

89. How do I design so that mistakes are cheap, not catastrophic?

90. How do I design systems that can be owned by teams, not heroes?

91. How do I design for “boring reliability” instead of cleverness?

92. How do I decide what *not* to build into a system?