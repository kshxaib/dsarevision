export const sqlVault = {
  id: 'sql',
  title: 'SQL & Database Queries',
  shortTitle: 'SQL',
  category: 'Core CS',
  icon: 'FileSpreadsheet',
  accentColor: '#06B6D4', // cyan-500
  description: 'Joins, Subqueries vs CTEs, Window functions (RANK, ROW_NUMBER, DENSE_RANK), Index tuning, Group By vs Having, and Top Interview Queries.',
  tags: ['Joins', 'CTEs', 'Window Functions', 'Group By', 'Indexing', 'Query Optimization', 'Triggers & Views'],
  questions: [
    {
      id: 'sql-q1',
      number: '01',
      topic: 'Joins',
      question: 'Explain all SQL Joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS) with syntax.',
      interviewTips: 'Emphasize what happens with NULLs when rows fail to match in OUTER joins.',
      answer: `• Types of SQL Joins:
  1. INNER JOIN: Returns only rows that have matching values in both tables.
  2. LEFT (OUTER) JOIN: Returns all rows from left table + matched rows from right; unmatched right columns are NULL.
  3. RIGHT (OUTER) JOIN: Returns all rows from right table + matched rows from left; unmatched left columns are NULL.
  4. FULL (OUTER) JOIN: Returns all rows from both tables; fills non-matching sides with NULL.
  5. CROSS JOIN (Cartesian Product): Pairs every row in table A with every row in table B (N × M rows).

• Example Syntax:
\`\`\`sql
-- Inner join
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- Left join (find employees without a department)
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;
\`\`\``
    },
    {
      id: 'sql-q2',
      number: '02',
      topic: 'Window Functions',
      question: 'What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?',
      interviewTips: 'This is the #1 most asked SQL interview question for finding Nth highest salary or top performers per department.',
      answer: `• Common Use: Used with OVER (PARTITION BY ... ORDER BY ...) to assign ranking numbers.

• Key Differences on Ties (e.g., Salaries: 100, 100, 90, 80):
  - ROW_NUMBER(): Assigns unique sequential integers; breaks ties arbitrarily (1, 2, 3, 4).
  - RANK(): Gives same rank to ties, but SKIPS subsequent ranks (1, 1, 3, 4).
  - DENSE_RANK(): Gives same rank to ties, and DOES NOT SKIP subsequent ranks (1, 1, 2, 3).

• High-Yield Interview Query: Find 2nd Highest Salary per Department:
\`\`\`sql
WITH RankedSalaries AS (
  SELECT 
    dept_id,
    employee_name,
    salary,
    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk
  FROM employees
)
SELECT dept_id, employee_name, salary
FROM RankedSalaries
WHERE rnk = 2;
\`\`\``
    },
    {
      id: 'sql-q3',
      number: '03',
      topic: 'Aggregations',
      question: 'What is the difference between WHERE and HAVING clauses?',
      interviewTips: 'Remember: WHERE filters individual rows BEFORE aggregation; HAVING filters aggregated groups AFTER GROUP BY.',
      answer: `• WHERE Clause:
  - Filters individual records before any grouping or aggregation takes place.
  - Cannot contain aggregate functions (e.g., WHERE SUM(salary) > 5000 is invalid SQL).
  - Can use indexes efficiently.

• HAVING Clause:
  - Filters groups created by the GROUP BY clause.
  - Can use aggregate functions like COUNT(), SUM(), AVG(), MAX(), MIN().

• Example:
\`\`\`sql
SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
WHERE is_active = 1          -- Filters active employees before grouping
GROUP BY dept_id
HAVING AVG(salary) > 80000;  -- Filters grouped departments after aggregation
\`\`\``
    },
    {
      id: 'sql-q4',
      number: '04',
      topic: 'Query Optimization',
      question: 'How do you optimize slow SQL queries? (EXPLAIN, Indexes, Sargability).',
      interviewTips: 'Highlight Sargable queries: Avoid wrapping indexed columns inside functions in the WHERE clause like YEAR(created_at) = 2024.',
      answer: `1. Use EXPLAIN / EXPLAIN ANALYZE:
   - Identify whether queries do full table scans (Seq Scan / ALL) vs Index Scans / Index Range Scans.
2. Ensure Queries are SARGABLE (Search Argument Able):
   - Non-Sargable: WHERE DATE(created_at) = '2024-01-01' (Disables B+ tree index on created_at).
   - Sargable: WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02' (Uses index range scan).
3. Use Covering Indexes:
   - An index that contains all columns required by the query (Index-Only Scan), completely avoiding disk heap lookups.
4. Avoid SELECT *:
   - Fetch only needed columns to reduce I/O and network payload.
5. Replace Subqueries with CTEs or JOINs:
   - Modern query optimizers optimize JOINs better than correlated subqueries.
6. Paginate using Keyset / Seek pagination instead of high OFFSET (OFFSET 10000 reads and discards 10,000 rows).`
    },
    {
      id: 'sql-q5',
      number: '05',
      topic: 'Interview Queries',
      question: 'How to delete duplicate rows from a table keeping only one instance?',
      interviewTips: 'Provide standard CTE + ROW_NUMBER() solution which works in PostgreSQL, SQL Server, and MySQL 8.0+.',
      answer: `• Solution Using CTE and ROW_NUMBER():
\`\`\`sql
WITH DuplicatesCTE AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (
      PARTITION BY email 
      ORDER BY id ASC
    ) AS row_num
  FROM users
)
DELETE FROM users
WHERE id IN (
  SELECT id FROM DuplicatesCTE WHERE row_num > 1
);
\`\`\`
• Explanation:
  - Partitions rows by the unique column (e.g. email).
  - The first entry gets row_num = 1; subsequent duplicate entries get row_num > 1 and are deleted.`
    }
  ]
};
