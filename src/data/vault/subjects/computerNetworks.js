export const computerNetworksVault = {
  id: 'cn',
  title: 'Computer Networks',
  shortTitle: 'CN',
  category: 'Core CS',
  icon: 'Network',
  accentColor: '#38BDF8', // sky-400
  description: 'OSI & TCP/IP models, TCP 3-way handshake, UDP vs TCP, DNS, HTTP/HTTPS, TLS handshake, Subnetting & Routing.',
  tags: ['OSI Model', 'TCP/IP', 'Handshake', 'DNS', 'HTTP & HTTPS', 'Subnetting', 'Routing'],
  questions: [
    {
      id: 'cn-q1',
      number: '01',
      topic: 'Protocols & Architecture',
      question: 'What is the difference between the OSI Model and TCP/IP Model?',
      interviewTips: 'Emphasize that OSI is a theoretical 7-layer reference model, while TCP/IP is the practical 4/5-layer protocol suite powering the internet.',
      answer: `• OSI Model (7 Layers):
  1. Application (HTTP, FTP, DNS)
  2. Presentation (SSL/TLS, Data encryption, Serialization)
  3. Session (Session establishment & management)
  4. Transport (TCP, UDP - Port to Port delivery)
  5. Network (IP, ICMP - Host to Host delivery & Routing)
  6. Data Link (Ethernet, MAC addressing, Framing)
  7. Physical (Cables, Bits, Radio frequencies)

• TCP/IP Model (4/5 Layers):
  - Collapses Application, Presentation, and Session into a single Application Layer.
  - Combines Data Link & Physical into Network Interface / Link Layer.

• Key Differences:
  - OSI strictly separates services, interfaces, and protocols.
  - TCP/IP was implemented first; protocols came before the model.
  - OSI guarantees reliable connection-oriented service at transport, whereas TCP/IP supports both connection-oriented (TCP) and connectionless (UDP).`
    },
    {
      id: 'cn-q2',
      number: '02',
      topic: 'TCP & UDP',
      question: 'Explain TCP 3-Way Handshake and 4-Way Handshake (Connection Teardown).',
      interviewTips: 'Interviewers often ask what happens during SYN flood attacks and why TIME_WAIT state exists (typically 2*MSL).',
      answer: `• TCP 3-Way Handshake (Connection Establishment):
  1. SYN: Client sends SYN packet with an Initial Sequence Number (ISN = x) to server (SYN_SENT).
  2. SYN-ACK: Server responds with SYN (ISN = y) and ACK (x + 1) (SYN_RECEIVED).
  3. ACK: Client sends ACK (y + 1). Connection is now established (ESTABLISHED).

• TCP 4-Way Handshake (Connection Termination):
  1. FIN: Client sends FIN to signal it has no more data to send (FIN_WAIT_1).
  2. ACK: Server sends ACK acknowledging the request (CLOSE_WAIT on server, FIN_WAIT_2 on client).
  3. FIN: Server sends its own FIN when done sending remaining data (LAST_ACK).
  4. ACK: Client acknowledges with ACK (server CLOSES, client enters TIME_WAIT for 2*MSL to ensure final ACK was received and clean duplicate packets).`
    },
    {
      id: 'cn-q3',
      number: '03',
      topic: 'TCP & UDP',
      question: 'Compare TCP vs UDP: Key differences, trade-offs, and use cases.',
      interviewTips: 'Mention header sizes (TCP: 20-60 bytes vs UDP: 8 bytes) and streaming/gaming protocols (QUIC/HTTP3 uses UDP).',
      answer: `• TCP (Transmission Control Protocol):
  - Connection-Oriented: Requires 3-way handshake before data transfer.
  - Reliability: Guarantees delivery via ACKs, retransmissions, and checksums.
  - In-Order Delivery: Uses sequence numbers to reassemble packets.
  - Flow & Congestion Control: Sliding Window protocol, Congestion Window (AIMD).
  - Overhead: Higher latency, 20-60 bytes header.
  - Use Cases: Web (HTTP/1.1 & HTTP/2), File transfer (FTP/SFTP), Email (SMTP/IMAP).

• UDP (User Datagram Protocol):
  - Connectionless: Sends packets immediately without handshakes.
  - Unreliable: Best-effort delivery; packets can be lost, duplicated, or out of order.
  - No Flow/Congestion Control: Transmits at application-defined rate.
  - Overhead: Minimal latency, fixed 8-byte header.
  - Use Cases: DNS queries, VoIP, Video Streaming, Real-time Multiplayer Gaming, HTTP/3 (QUIC).`
    },
    {
      id: 'cn-q4',
      number: '04',
      topic: 'Web Protocols',
      question: 'What happens under the hood when you type a URL in the browser and press Enter?',
      interviewTips: 'Walk systematically through: DNS -> TCP Handshake -> TLS Handshake -> HTTP Request/Response -> Browser Rendering.',
      answer: `1. URL Parsing & HSTS Check: Browser parses protocol, host, port, path, and checks preloaded HSTS list for HTTPS enforcement.
2. DNS Resolution:
   - Checks Browser DNS Cache -> OS Cache -> Router Cache -> Local ISP DNS Resolver.
   - If cache miss: Resolver queries Root DNS -> TLD DNS (.com) -> Authoritative Nameserver.
3. TCP Connection: 3-way handshake established between client and server IP on port 80/443.
4. TLS/SSL Handshake (HTTPS):
   - Client Hello (supported cipher suites).
   - Server Hello + SSL Certificate (public key).
   - Certificate validation via CA chain.
   - Pre-master secret exchange -> Symmetric session key generated.
5. HTTP Request & Server Processing: Browser sends GET request with headers/cookies; reverse proxy (Nginx) forwards to web server/app.
6. HTTP Response: Server responds with status code (200 OK) + HTML payload.
7. Critical Rendering Path:
   - Parses HTML -> DOM Tree.
   - Parses CSS -> CSSOM Tree.
   - Combines into Render Tree -> Layout (Reflow) -> Paint -> Composite.`
    },
    {
      id: 'cn-q5',
      number: '05',
      topic: 'Web Protocols',
      question: 'HTTP vs HTTPS and How TLS/SSL Handshake Works.',
      interviewTips: 'Clarify that TLS uses Asymmetric encryption to securely exchange symmetric keys, then uses Symmetric encryption for high-speed data transmission.',
      answer: `• HTTP vs HTTPS:
  - HTTP runs over plaintext (Port 80); vulnerable to eavesdropping and Man-In-The-Middle (MITM) attacks.
  - HTTPS runs over TLS/SSL encryption (Port 443); provides Confidentiality, Integrity, and Authentication.

• TLS 1.3 Handshake (1-RTT Flow):
  1. Client Hello: Sends supported TLS version, supported cipher suites, and Client Random + Key Share (Diffie-Hellman parameter).
  2. Server Hello: Selects cipher suite, sends Server Random + Key Share + SSL Certificate.
  3. Authentication: Client verifies server certificate against trusted Root Certificate Authorities (CAs).
  4. Symmetric Key Derivation: Both sides derive the same shared symmetric session key (AES-GCM or ChaCha20).
  5. Encrypted Traffic: All subsequent requests and responses are encrypted using this session key.`
    },
    {
      id: 'cn-q6',
      number: '06',
      topic: 'Addressing & Subnetting',
      question: 'What is Subnetting and how do Subnet Masks (CIDR notation) work?',
      interviewTips: 'Remember: 2^(32 - n) total IPs, with 2 reserved (Network Address and Broadcast Address).',
      answer: `• What is Subnetting:
  - Dividing a large network into smaller, manageable sub-networks (subnets).
  - Reduces broadcast traffic, enhances security, and prevents IP wastage.

• Subnet Mask & CIDR:
  - An IPv4 address is 32 bits (4 octets).
  - Subnet mask separates the Network portion from the Host portion (1s for network, 0s for host).
  - Example: 192.168.1.0/24:
    - /24 means first 24 bits are Network bits (255.255.255.0).
    - Remaining 32 - 24 = 8 bits are Host bits.
    - Total IPs = 2^8 = 256.
    - Usable IPs = 256 - 2 = 254 (1st is Network ID: 192.168.1.0; last is Broadcast ID: 192.168.1.255).`
    },
    {
      id: 'cn-q7',
      number: '07',
      topic: 'Protocols & Architecture',
      question: 'Explain DNS, its hierarchy, and the difference between Recursive and Iterative queries.',
      interviewTips: 'State the difference: In recursive, the resolver does all the legwork on client’s behalf. In iterative, each server refers the resolver to the next server down the chain.',
      answer: `• DNS (Domain Name System):
  - Distributed database translating human-readable domain names (google.com) to machine IP addresses (142.250.190.46).

• DNS Hierarchy:
  1. Root Nameservers: Top of tree (13 logical root server IPs worldwide named a.root-servers.net to m.root-servers.net).
  2. TLD Nameservers: Top-Level Domain servers (.com, .org, .edu, .io).
  3. Authoritative Nameservers: Holds actual DNS records (A, AAAA, CNAME, MX) configured by domain owner.

• Recursive vs Iterative Query:
  - Recursive Query: Client asks Local DNS Resolver: "Give me the answer or error". The resolver assumes full responsibility.
  - Iterative Query: Resolver asks Root -> Root answers "Ask .com TLD at IP X" -> Resolver asks TLD -> TLD answers "Ask Authoritative NS at IP Y".`
    }
  ]
};
