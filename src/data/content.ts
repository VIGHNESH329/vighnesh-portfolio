export interface ProjectData {
  id: string;
  title: string;
  overview: string;
  tech: string[];
  featured?: boolean;
  image?: string;
}

export const cyberContent = {
  identity: 'Cybersecurity Undergraduate',
  personal: {
    name: 'Panidam Deepak Sai Vighnesh',
    email: 'deepaksaivighneshpanidam@gmail.com',
    phone: '+91 9346096782',
    links: {
      github: 'https://github.com/VIGHNESH329',
      linkedin: 'https://www.linkedin.com/in/deepak-sai-vighnesh-panidam-91b35928a/',
      tryhackme: 'https://tryhackme.com/p/Deepaksaivighnesh'
    }
  },
  hero: {
    headline: 'DEEPAK SAI VIGHNESH',
    subheadline: 'CYBERSECURITY UNDERGRADUATE',
    rotatingTitles: [
      'SOC Analyst',
      'Penetration Tester',
      'Threat Hunter',
      'CTF Player',
      'Security Research Enthusiast'
    ],
    tagline: 'Cybersecurity undergraduate (B.Tech, 2027) with hands-on experience in security monitoring, threat intelligence, digital forensics, and incident response.'
  },
  stats: [
    { label: 'CGPA', value: '7.89' },
    { label: 'CTF', value: 'Active Player' },
    { label: 'Certifications', value: 'ISC2 CC, Google Cyber' },
    { label: 'Organizations', value: 'FACT Club Member' }
  ],
  education: [
    {
      institution: 'Amrita School of Computing, Chennai',
      degree: 'B.Tech in Computer Science (Cybersecurity)',
      period: '2023 - 2027',
      score: 'CGPA: 7.89/10'
    },
    {
      institution: 'Sri Chaitanya Junior College',
      degree: 'Intermediate (MPC)',
      period: '2021 - 2023',
      score: '94%'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Class Representative (CR)',
      duration: 'November 2025 – June 2026',
      description: [
        'Represented the class in academic and administrative coordination.',
        'Acted as the communication bridge between faculty and students.',
        'Assisted in organizing academic activities and class-level coordination.'
      ]
    }
  ],
  projects: [
    {
      id: 'cyber-1',
      featured: true,
      title: 'SECURE-CAN Automotive Network Security Framework',
      overview: 'Designed a real-time cybersecurity framework for secure CAN Bus communication using lightweight encryption, intrusion detection mechanisms, and ECU traffic monitoring dashboards.',
      tech: ['CAN Bus', 'Lightweight Encryption', 'Intrusion Detection'],
      image: '/images/cyber_can.png'
    },
    {
      id: 'cyber-2',
      title: 'SIEM Security Monitoring Lab',
      overview: 'Built a security monitoring environment using Microsoft Sentinel and SIEM technologies to analyze logs, monitor events, and investigate suspicious activities.',
      tech: ['Microsoft Sentinel', 'Splunk', 'SIEM', 'IDS/IPS'],
      image: '/images/cyber_siem.png'
    },
    {
      id: 'cyber-3',
      title: 'Web Application Security Assessment Project',
      overview: 'Conducted comprehensive security assessments on web applications identifying vulnerabilities in alignment with OWASP Top 10. Utilized professional proxy tools for traffic interception and manipulation.',
      tech: ['Burp Suite', 'OWASP Top 10', 'Web Security', 'Penetration Testing'],
      image: '/images/cyber_web_sec.png'
    },
    {
      id: 'cyber-4',
      title: 'Digital Forensics & Incident Response Framework',
      overview: 'Developed an IR framework covering automated log parsing, anomaly detection, file integrity verification, and forensic reporting. Implemented mitigation actions for confirmed security incidents.',
      tech: ['Log Parsing', 'Anomaly Detection', 'File Integrity Verification', 'Forensic Reporting'],
      image: '/images/cyber_forensics.png'
    }
  ] as ProjectData[],
  skills: [
    'Burp Suite', 'Metasploit', 'Autopsy', 'TryHackMe', 'Penetration Testing', 'Web Application Security',
    'Digital Forensics', 'Threat Hunting', 'Incident Response', 'SIEM', 'Microsoft Sentinel', 'Splunk',
    'Wireshark', 'Nmap', 'IDS/IPS', 'TCP/IP',
    'Windows Event Logs', 'Linux Syslogs', 'Anomaly Detection',
    'Threat Intelligence', 'IOC Identification', 'Alert Triage', 'Containment & Recovery',
    'Vulnerability Assessments', 'Qualys', 'Microsoft Defender for Endpoint', 'Patch Management',
    'Log Parsing', 'File Integrity Verification', 'Forensic Reporting'
  ],
  certifications: [
    'ISC2 Certified in Cybersecurity (CC)',
    'Google Cybersecurity Professional Certificate',
    'Ethical Byte Penetration Pro Certification'
  ],
  achievements: [
    'Leadership & Responsibilities: Class Representative (Nov 2025 – June 2026) — Acted as the communication bridge between faculty and students, representing the class in academic and administrative coordination.',
    'CTF Player — Active CTF participation in web exploitation, cryptography, reverse engineering, and forensics challenges.',
    'Active member of FACT cybersecurity club, contributing to CTF organization, technical workshops, and security awareness events.'
  ]
};

export const sdeContent = {
  identity: 'Software Development Engineer',
  personal: {
    name: 'Panidam Deepak Sai Vighnesh',
    email: 'deepaksaivighneshpanidam@gmail.com',
    phone: '+91 9346096782',
    links: {
      github: 'https://github.com/VIGHNESH329',
      linkedin: 'https://www.linkedin.com/in/deepak-sai-vighnesh-panidam-91b35928a/',
      leetcode: 'https://leetcode.com/u/deepaksaivighneshpanidam/'
    }
  },
  hero: {
    headline: 'DEEPAK SAI VIGHNESH',
    subheadline: 'SOFTWARE ENGINEER',
    rotatingTitles: [
      'Backend Developer',
      'Problem Solver',
      'System Builder',
      'Full Stack Learner'
    ],
    tagline: 'Passionate about software development, problem-solving, and building scalable applications through hands-on projects, hackathons, and technical initiatives.'
  },
  stats: [
    { label: 'CGPA', value: '7.89' },
    { label: 'Hackathons', value: 'SIH 2024 & More' },
    { label: 'Certifications', value: 'Google Cyber, Oracle OCI' },
    { label: 'Organizations', value: 'FACT Club Member' }
  ],
  education: [
    {
      institution: 'Amrita Vishwa Vidyapeetham',
      degree: 'B.Tech in Cyber Security',
      period: 'Expected Graduation: 2027',
      score: 'CGPA: 7.89/10.0'
    },
    {
      institution: 'Sri Chaitanya Junior College',
      degree: 'Intermediate (MPC)',
      period: '2021 - 2023',
      score: '94%'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Class Representative (CR)',
      duration: 'November 2025 – June 2026',
      description: [
        'Represented the class in academic and administrative coordination.',
        'Acted as the communication bridge between faculty and students.',
        'Assisted in organizing academic activities and class-level coordination.'
      ]
    }
  ],
  projects: [
    {
      id: 'sde-1',
      featured: true,
      title: 'Accident Detection System',
      overview: 'Engineered a real-time accident detection system utilizing computer vision and deep learning to monitor video feeds and identify vehicular accidents instantaneously for rapid emergency response.',
      tech: ['Computer Vision', 'Deep Learning', 'Real-Time Detection', 'AI-Based Monitoring'],
      image: '/images/sde_accident.png'
    },
    {
      id: 'sde-2',
      title: 'AI Trip Planning Agent',
      overview: 'Developed an intelligent trip planning agent that generates optimized travel itineraries using large language models, factoring in user preferences, budgets, and real-time constraints.',
      tech: ['Python', 'LLMs', 'API Integration', 'Prompt Engineering'],
      image: '/images/sde_trip.png'
    },
    {
      id: 'sde-3',
      title: 'Smart Hospital Management System',
      overview: 'Developed a hospital management system to manage patient records, doctor information, and appointment scheduling. Implemented authentication, appointment booking, and patient management functionalities.',
      tech: ['Python', 'Flask', 'SQLite'],
      image: '/images/sde_hospital.png'
    },
    {
      id: 'sde-4',
      title: 'Password Security Analyzer and Hash Evaluation System',
      overview: 'Developed a password analysis tool to evaluate password strength and security. Implemented hashing algorithms, entropy calculations, and password validation mechanisms.',
      tech: ['Python', 'Flask', 'Hashing Algorithms'],
      image: '/images/sde_password.png'
    }
  ] as ProjectData[],
  skills: [
    'C++', 'Python', 'C', 'Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Operating Systems',
    'Computer Networks', 'HTML', 'CSS', 'JavaScript', 'Flask', 'MySQL', 'SQLite', 'SQL', 'Git', 'GitHub', 'Linux', 'VS Code'
  ],
  certifications: [
    'Google Cybersecurity Professional Certificate',
    'Oracle OCI AI Foundations Associate'
  ],
  achievements: [
    'Leadership & Responsibilities: Class Representative (Nov 2025 – June 2026) — Acted as the communication bridge between faculty and students, representing the class in academic and administrative coordination.',
    'Participated in Smart India Hackathon (SIH) 2024 and multiple university-level hackathons focused on software development and innovation.',
    'Volunteered for KyberAstra Hackathon, supporting event coordination and technical activities.',
    'Core Member of FACT (Forensic Analysis Club and Triage), Amrita Vishwa Vidyapeetham.'
  ]
};
