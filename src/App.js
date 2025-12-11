import React, { useState, useRef, useEffect } from "react";

// Simulated file system structure with metadata
const fileSystem = {
  "/": {
    type: "directory",
    perm: "drwxr-xr-x",
    owner: "root",
    size: 4096,
    mtime: "Dec 11 11:40",
    contents: {
      "home": {
        type: "directory",
        perm: "drwxr-xr-x",
        owner: "root",
        size: 4096,
        mtime: "Dec 11 11:40",
        contents: {
          "nii": {
            type: "directory",
            perm: "drwxr-xr-x",
            owner: "nii",
            size: 4096,
            mtime: "Dec 11 11:40",
            contents: {
              "portfolio": {
                type: "directory",
                perm: "drwxr-xr-x",
                owner: "nii",
                size: 4096,
                mtime: "Dec 11 11:41",
                contents: {
                  "about.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 1024, mtime: "Dec 11 11:41", content: "about" },
                  "contact.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 1024, mtime: "Dec 11 11:41", content: "contact" },
                  "projects.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 1024, mtime: "Dec 11 11:41", content: "projects" },
                  "skills.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 1024, mtime: "Dec 11 11:41", content: "skills" },
                  "projects": {
                    type: "directory",
                    perm: "drwxr-xr-x",
                    owner: "nii",
                    size: 4096,
                    mtime: "Dec 11 11:42",
                    contents: {
                      "task-tracker-cli.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "task-tracker-cli" },
                      "task-tracker-desktop.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "task-tracker-desktop" },
                      "mental-game.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "mental-game" },
                      "fallen-angel.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "fallen-angel" },
                      "causehive.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "causehive" },
                      "airline-database.txt": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 2048, mtime: "Dec 11 11:42", content: "airline-database" },
                    }
                  },
                  "secret-diary.txt": { type: "file", perm: "-rw-r-----", owner: "root", rootOnly: true, size: 512, mtime: "Dec 11 11:43", content: "secret-diary" },
                  "README.md": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 1024, mtime: "Dec 11 11:41", content: "readme" },
                }
              },
              "Documents": { 
                type: "directory", 
                perm: "drwxr-xr-x", 
                owner: "nii", 
                size: 4096, 
                mtime: "Dec 11 11:40", 
                contents: {
                  "resume.pdf": { type: "file", perm: "-rw-r--r--", owner: "nii", size: 245760, mtime: "Dec 12 14:30", content: "resume", isPdf: true },
                } 
              },
              "Downloads": { type: "directory", perm: "drwxr-xr-x", owner: "nii", size: 4096, mtime: "Dec 11 11:40", contents: {} },
              "now_playing.sh": { type: "file", perm: "-rwxr-xr-x", owner: "nii", size: 512, mtime: "Dec 12 10:30", content: "now_playing" },
            }
          }
        }
      },
      "bin": { type: "directory", perm: "drwxr-xr-x", owner: "root", size: 4096, mtime: "Dec 11 11:40", contents: {} },
      "etc": { type: "directory", perm: "drwxr-xr-x", owner: "root", size: 4096, mtime: "Dec 11 11:40", contents: {} },
      "usr": { type: "directory", perm: "drwxr-xr-x", owner: "root", size: 4096, mtime: "Dec 11 11:40", contents: {} },
      "var": {
        type: "directory",
        perm: "drwxr-xr-x",
        owner: "root",
        size: 4096,
        mtime: "Dec 11 11:40",
        contents: {
          "log": {
            type: "directory",
            perm: "drwxr-xr-x",
            owner: "root",
            size: 4096,
            mtime: "Dec 11 11:42",
            contents: {
              "secret-diary.txt": { type: "file", perm: "-rw-------", owner: "root", rootOnly: true, size: 512, mtime: "Dec 11 11:43", content: "secret-diary" }
            }
          }
        }
      },
    }
  }
};

// Terminal data and commands
const terminalData = {
  welcome: [
    { type: "output", value: "Welcome to Nii 0.1 (GNU/Linux 6.17.0-8-generic x86_64)" },
    { type: "output", value: "" },
    { type: "output", value: "This is Nii's Portfolio Terminal. Type 'help' to see available commands." },
    { type: "output", value: "" },
  ],
  help: [
    { type: "output", value: "Available commands:" },
    { type: "output", value: "" },
    { type: "output", value: "File System Commands:" },
    { type: "output", value: "  ls [dir]       - List directory contents" },
    { type: "output", value: "  cd [dir]       - Change directory" },
    { type: "output", value: "  pwd            - Print working directory" },
    { type: "output", value: "  cat <file>     - Display file contents" },
    { type: "output", value: "  less <file>     - View file (paginated)" },
    { type: "output", value: "  more <file>    - View file (paginated)" },
    { type: "output", value: "  head <file>    - Show first lines of file" },
    { type: "output", value: "  tail <file>    - Show last lines of file" },
    { type: "output", value: "  open <file>    - Open file (PDFs open in new tab)" },
    { type: "output", value: "  touch <file>   - Create empty file" },
    { type: "output", value: "  mkdir <dir>    - Create directory" },
    { type: "output", value: "  rm <file>      - Remove file" },
    { type: "output", value: "  rmdir <dir>    - Remove empty directory" },
    { type: "output", value: "  grep <pattern> <file> - Search in file" },
    { type: "output", value: "  find [path] [-name pattern] - Find files" },
    { type: "output", value: "" },
    { type: "output", value: "System Commands:" },
    { type: "output", value: "  whoami         - Show current user" },
    { type: "output", value: "  echo [text]    - Display text" },
    { type: "output", value: "  date           - Display current date and time" },
    { type: "output", value: "  env            - Display environment variables" },
    { type: "output", value: "  export [var]   - Set environment variable" },
    { type: "output", value: "  history        - Show command history" },
    { type: "output", value: "  alias [name]   - Create command alias" },
    { type: "output", value: "  type [cmd]     - Display command type" },
    { type: "output", value: "  which [cmd]    - Show command path" },
    { type: "output", value: "  man [cmd]      - Display command manual" },
    { type: "output", value: "  neofetch       - Display system information" },
    { type: "output", value: "  sudo [cmd]     - Run command as superuser (fun)" },
    { type: "output", value: "  clear          - Clear the terminal screen" },
    { type: "output", value: "  exit/logout    - Exit the terminal" },
    { type: "output", value: "" },
    { type: "output", value: "Network Commands:" },
    { type: "output", value: "  ifconfig       - Display network interfaces" },
    { type: "output", value: "  ip [addr]      - Show/manipulate routing and devices" },
    { type: "output", value: "  hostname       - Show system hostname" },
    { type: "output", value: "  ping [host]    - Test network connectivity" },
    { type: "output", value: "  curl [url]     - Transfer data from URL" },
    { type: "output", value: "  wget [file]    - Download files (simulated)" },
    { type: "output", value: "  myip           - Display your public IP and location" },
    { type: "output", value: "" },
    { type: "output", value: "Use Tab for command completion, ↑/↓ for command history." },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  about: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║                    ABOUT JUDE NII KLEMESU COMMEY                  ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: "Name:     Jude Nii Klemesu Commey" },
    { type: "output", value: "Role:     Aspiring Cybersecurity Professional & Backend Developer" },
    { type: "output", value: "Location: Ofankor, Accra, Ghana" },
    { type: "output", value: "Status:   Computer Science Student @ University of Ghana" },
    { type: "output", value: "" },
    { type: "output", value: "═══ ABOUT ME ═══" },
    { type: "output", value: "" },
    { type: "output", value: "I'm a Computer Science student at the University of Ghana with a deep" },
    { type: "output", value: "passion for cybersecurity and backend development. I thrive on building" },
    { type: "output", value: "secure, user-focused applications using modern technologies like Django," },
    { type: "output", value: ".FastAPI, and REST APIs." },
    { type: "output", value: "" },
    { type: "output", value: "Currently expanding my expertise in Python and diving deep into the" },
    { type: "output", value: "cybersecurity landscape through hands-on projects, certifications, and" },
    { type: "output", value: "continuous learning." },
    { type: "output", value: "" },
    { type: "output", value: "═══ PHILOSOPHY ═══" },
    { type: "output", value: "" },
    { type: "output", value: "I believe technology should empower and protect. I'm committed to helping" },
    { type: "output", value: "individuals and organizations stay safe online while building systems that" },
    { type: "output", value: "are both robust and elegant." },
    { type: "output", value: "" },
    { type: "output", value: "═══ FUN FACT ═══" },
    { type: "output", value: "" },
    { type: "output", value: "The stress from debugging entices me. There's nothing quite like that" },
    { type: "output", value: "moment when everything finally clicks! " },
    { type: "output", value: "" },
    { type: "output", value: "─────────────────────────────────────────────────────────────────────" },
    { type: "output", value: "Type 'cat contact.txt' to see my contact information" },
    { type: "output", value: "Type 'cat skills.txt' to see my technical skills" },
    { type: "output", value: "Type 'cat projects.txt' or 'ls projects/' to explore my projects" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  contact: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║                       CONTACT INFORMATION                          ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: " EMAIL" },
    { type: "output", value: "   Primary:   jude.niicommey@outlook.com" },
    { type: "output", value: "   Alternate: jnkcommey@gmail.com" },
    { type: "output", value: "" },
    { type: "output", value: " PHONE" },
    { type: "output", value: "   +233 209 365 355" },
    { type: "output", value: "" },
    { type: "output", value: " LOCATION" },
    { type: "output", value: "   Ofankor, Accra, Ghana" },
    { type: "output", value: "" },
    { type: "output", value: " SOCIAL LINKS" },
    { 
      type: "output", 
      label: "   LinkedIn:  ",
      value: {
        href: "https://linkedin.com/in/niicommey01",
        text: "LinkedIn"
      }
    },
    { 
      type: "output", 
      label: "   GitHub:    ",
      value: {
        href: "https://github.com/niicommey01",
        text: "GitHub"
      }
    },
    { 
      type: "output", 
      label: "   WhatsApp:  ",
      value: {
        href: "https://wa.me/233209365355",
        text: "WhatsApp"
      }
    },
    { type: "output", value: "" },
    { type: "output", value: "═══ AVAILABILITY ═══" },
    { type: "output", value: "" },
    { type: "output", value: "I'm currently open to:" },
    { type: "output", value: "  • Internship opportunities in Cybersecurity" },
    { type: "output", value: "  • Job opportunities in Backend Development" },
    { type: "output", value: "  • Collaborative projects and open-source contributions" },
    { type: "output", value: "  • Freelance backend development work" },
    { type: "output", value: "  • Technical discussions and knowledge sharing" },
    { type: "output", value: "" },
    { type: "output", value: "Feel free to reach out via email or LinkedIn. I typically respond" },
    { type: "output", value: "within 24 hours!" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  skills: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║                        TECHNICAL SKILLS                            ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: "═══ PROGRAMMING LANGUAGES ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  Python                       ████████████░░░░░░░░  60%  |  Primary language" },
    { type: "output", value: "  JavaScript                   ████████░░░░░░░░░░░░  40%  |  Frontend & Node.js" },
    { type: "output", value: "  C#                           ████████░░░░░░░░░░░░  40%  |  .NET development" },
    { type: "output", value: "  Java                         ███████░░░░░░░░░░░░░  35%  |  OOP" },
    { type: "output", value: "  SQL                          ███████░░░░░░░░░░░░░  35%  |  Database queries" },
    { type: "output", value: "  Bash                         ████████░░░░░░░░░░░░  40%  |  Shell scripting" },
    { type: "output", value: "" },
    { type: "output", value: "═══ FRAMEWORKS & LIBRARIES ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  Django                       ████████████░░░░░░░░  60%  |  Backend framework" },
    { type: "output", value: "  React                        ████████░░░░░░░░░░░░  40%  |  UI development" },
    { type: "output", value: "  .NET                         ████████░░░░░░░░░░░░  40%  |  Enterprise apps" },
    { type: "output", value: "  Django REST                  ██████████░░░░░░░░░░  50%  |  API development" },
    { type: "output", value: "  PyQt5                        ███████░░░░░░░░░░░░░  35%  |  Desktop apps" },
    { type: "output", value: "" },
    { type: "output", value: "═══ DATABASES ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  PostgreSQL                   ███████░░░░░░░░░░░░░  35%  |  Relational DB" },
    { type: "output", value: "  MySQL                        ███████░░░░░░░░░░░░░  35%  |  Database design" },
    { type: "output", value: "  SQLite                       ████████░░░░░░░░░░░░  40%  |  Lightweight DB" },
    { type: "output", value: "" },
    { type: "output", value: "═══ TOOLS & TECHNOLOGIES ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  Git                          ██████████░░░░░░░░░░  50%  |  Version control" },
    { type: "output", value: "  REST APIs                    ████████████░░░░░░░░  60%  |  API design" },
    { type: "output", value: "  OAuth                        ████████░░░░░░░░░░░░  40%  |  Authentication" },
    { type: "output", value: "  Linux/Unix                   ██████████░░░░░░░░░░  50%  |  System admin" },
    { type: "output", value: "  Docker                       ██████░░░░░░░░░░░░░░  30%  |  Containerization" },
    { type: "output", value: "" },
    // { type: "output", value: "═══ CYBERSECURITY ═══" },
    // { type: "output", value: "" },
    // { type: "output", value: "  Network Security             ████████░░░░░░░░░░░░  40%" },
    // { type: "output", value: "  Web Security                 ████████░░░░░░░░░░░░  40%" },
    // { type: "output", value: "  Security Best Practices      ████████░░░░░░░░░░░░  40%" },
    // { type: "output", value: "  Penetration Testing          ██████░░░░░░░░░░░░░░  30%" },
    { type: "output", value: "" },
    { type: "output", value: "═══ SOFT SKILLS ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  • Problem-solving and analytical thinking" },
    { type: "output", value: "  • Team collaboration and communication" },
    { type: "output", value: "  • Self-motivated learner" },
    { type: "output", value: "  • Attention to detail and code quality" },
    { type: "output", value: "  • Project management and time management" },
    { type: "output", value: "" },
    { type: "output", value: "─────────────────────────────────────────────────────────────────────" },
    { type: "output", value: "Type 'ls projects/' to see how I've applied these skills" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  projects: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║                           MY PROJECTS                              ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: "Here's a collection of projects I've built. For detailed information," },
    { type: "output", value: "navigate to the projects directory and cat individual project files:" },
    { type: "output", value: "" },
    { type: "output", value: "  $ cd projects" },
    { type: "output", value: "  $ ls" },
    { type: "output", value: "  $ cat task-tracker-cli.txt" },
    { type: "output", value: "" },
    { type: "output", value: "═══ FEATURED PROJECTS ═══" },
    { type: "output", value: "" },
    { type: "output", value: "1.   Fallen Angel – E-Commerce Platform" },
    { type: "output", value: "   Online clothing brand startup with full payment integration" },
    { type: "output", value: "   Tech: React, Django, PostgreSQL, REST APIs, OAuth, Paystack" },
    { type: "output", value: "   File: fallen-angel.txt" },
    { type: "output", value: "" },
    { type: "output", value: "2.   CauseHive – Donation Platform" },
    { type: "output", value: "   Platform connecting donors with verified causes" },
    { type: "output", value: "   Tech: React, Django, PostgreSQL, REST APIs, Paystack" },
    { type: "output", value: "   File: causehive.txt" },
    { type: "output", value: "" },
    { type: "output", value: "3.   Task Tracker (CLI)" },
    { type: "output", value: "   Command-line task management application" },
    { type: "output", value: "   Tech: Python, JSON" },
    { type: "output", value: "   File: task-tracker-cli.txt" },
    { type: "output", value: "" },
    { type: "output", value: "4.   Task Tracker (Desktop)" },
    { type: "output", value: "   Cross-platform desktop task management app" },
    { type: "output", value: "   Tech: Python, PyQt5, JSON" },
    { type: "output", value: "   File: task-tracker-desktop.txt" },
    { type: "output", value: "" },
    { type: "output", value: "5.   Mental Game" },
    { type: "output", value: "   Terminal-based puzzle game" },
    { type: "output", value: "   Tech: C#" },
    { type: "output", value: "   File: mental-game.txt" },
    { type: "output", value: "" },
    { type: "output", value: "6.   Airline Database" },
    { type: "output", value: "   Comprehensive airline management database system" },
    { type: "output", value: "   Tech: MySQL, Database Design" },
    { type: "output", value: "   File: airline-database.txt" },
    { type: "output", value: "" },
    { type: "output", value: "─────────────────────────────────────────────────────────────────────" },
    { 
      type: "output", 
      label: "All project source code available on: ",
      value: {
        href: "https://github.com/niicommey01",
        text: "GitHub"
      }
    },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  readme: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║               NII'S PORTFOLIO TERMINAL - README.md                 ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: "Welcome to my interactive portfolio terminal! This is a fully functional" },
    { type: "output", value: "Linux-style terminal emulator built with React that showcases my projects," },
    { type: "output", value: "skills, and experience in an engaging, hands-on way." },
    { type: "output", value: "" },
    { type: "output", value: "═══ QUICK START ═══" },
    { type: "output", value: "" },
    { type: "output", value: "Get started with these commands:" },
    { type: "output", value: "" },
    { type: "output", value: "  $ help              # View all available commands" },
    { type: "output", value: "  $ ls                # List files in current directory" },
    { type: "output", value: "  $ cat about.txt     # Learn about me" },
    { type: "output", value: "  $ cat skills.txt    # View my technical skills" },
    { type: "output", value: "  $ cd projects       # Navigate to projects directory" },
    { type: "output", value: "  $ cat contact.txt   # Get my contact information" },
    { type: "output", value: "  $ myip              # See your IP and location info" },
    { type: "output", value: "  $ neofetch          # Display system information" },
    { type: "output", value: "" },
    { type: "output", value: "═══ FEATURES ═══" },
    { type: "output", value: "" },
    { type: "output", value: "This terminal supports:" },
    { type: "output", value: "  ✓ 50+ Linux commands (ls, cd, cat, grep, find, etc.)" },
    { type: "output", value: "  ✓ File system navigation and manipulation" },
    { type: "output", value: "  ✓ Real-time IP geolocation" },
    { type: "output", value: "  ✓ Network utilities (ifconfig, ping, curl)" },
    { type: "output", value: "  ✓ Command history (↑/↓ arrows)" },
    { type: "output", value: "  ✓ Tab completion" },
    { type: "output", value: "  ✓ Environment variables and aliases" },
    { type: "output", value: "  ✓ Man pages for all commands (man <command>)" },
    { type: "output", value: "  ✓ Root access (su root, password: niicommey01)" },
    { type: "output", value: "" },
    { type: "output", value: "═══ NAVIGATION TIPS ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  • Use 'ls -l' for detailed file listings" },
    { type: "output", value: "  • Use 'cd ..' to go up one directory" },
    { type: "output", value: "  • Use 'pwd' to see your current location" },
    { type: "output", value: "  • Use 'clear' to clean the screen" },
    { type: "output", value: "  • Use 'history' to see previous commands" },
    { type: "output", value: "  • Press Tab for command completion" },
    { type: "output", value: "  • Press ↑/↓ to cycle through command history" },
    { type: "output", value: "" },
    { type: "output", value: "═══ ABOUT THE PROJECT ═══" },
    { type: "output", value: "" },
    { type: "output", value: "Built with: React, JavaScript, CSS" },
    { type: "output", value: "Theme: Nord-inspired color scheme" },
    { type: "output", value: "Features: Simulated Linux file system, real API integration" },
    { type: "output", value: "" },
    { type: "output", value: "═══ ABOUT ME ═══" },
    { type: "output", value: "" },
    { type: "output", value: "Jude Nii Klemesu Commey" },
    { type: "output", value: "Aspiring Cybersecurity Professional & Backend Developer" },
    { type: "output", value: "Computer Science Student @ University of Ghana" },
    { type: "output", value: "" },
    { type: "output", value: "Specializing in:" },
    { type: "output", value: "  • Python (Django, REST APIs)" },
    { type: "output", value: "  • JavaScript (React, Node.js)" },
    { type: "output", value: "  • C# (.NET)" },
    { type: "output", value: "  • Cybersecurity & Network Security" },
    { type: "output", value: "  • Database Design (PostgreSQL, MySQL)" },
    { type: "output", value: "" },
    { type: "output", value: "═══ CONNECT ═══" },
    { type: "output", value: "" },
    { 
      type: "output", 
      label: "  GitHub:   ",
      value: {
        href: "https://github.com/niicommey01",
        text: "GitHub"
      }
    },
    { 
      type: "output", 
      label: "  LinkedIn: ",
      value: {
        href: "https://linkedin.com/in/niicommey01",
        text: "LinkedIn"
      }
    },
    { type: "output", value: "  Email:    jude.niicommey@outlook.com" },
    { type: "output", value: "" },
    { type: "output", value: "─────────────────────────────────────────────────────────────────────" },
    { type: "output", value: "Type 'cat about.txt' for more information or 'help' for commands" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  resume: [
    { type: "output", value: "╔════════════════════════════════════════════════════════════════════╗" },
    { type: "output", value: "║                     📄 RESUME - PDF DOCUMENT                      ║" },
    { type: "output", value: "╚════════════════════════════════════════════════════════════════════╝" },
    { type: "output", value: "" },
    { type: "output", value: "This is a PDF file and cannot be displayed directly in the terminal." },
    { type: "output", value: "" },
    { type: "output", value: "═══ FILE INFORMATION ═══" },
    { type: "output", value: "" },
    { type: "output", value: "  Filename:  resume.pdf" },
    { type: "output", value: "  Size:      240 KB" },
    { type: "output", value: "  Type:      PDF Document" },
    { type: "output", value: "  Owner:     nii" },
    { type: "output", value: "" },
    { type: "output", value: "═══ DOWNLOAD OPTIONS ═══" },
    { type: "output", value: "" },
    { 
      type: "output", 
      value: {
        href: "https://drive.google.com/file/d/1227peCwvlelYkIhEq74uwuLhvr1TN9oj/view?usp=sharing",
        text: "Click here to view/download my resume"
      }
    },
    { type: "output", value: "" },
    { type: "output", value: "Or use one of these commands:" },
    { type: "output", value: "  $ open resume.pdf       # Opens the PDF in a new tab" },
    { type: "output", value: "  $ wget resume.pdf       # Simulates downloading the PDF" },
    { type: "output", value: "" },
    { type: "output", value: "─────────────────────────────────────────────────────────────────────" },
    // { type: "output", value: "💡 Tip: Replace YOUR_GOOGLE_DRIVE_FILE_ID with your actual resume link" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  whoami: [
    { type: "output", value: "nii" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
};

// Detailed project descriptions
const projectDetails = {
  "task-tracker-cli": [
    { type: "output", value: "Task Tracker – CLI Version" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Repository: https://github.com/niicommey01/task-tracker" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A command-line interface task management application built with" },
    { type: "output", value: "  Python. This project demonstrates proficiency in Python programming," },
    { type: "output", value: "  file I/O operations, and creating user-friendly CLI applications." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • Python 3.x" },
    { type: "output", value: "  • JSON for data persistence" },
    { type: "output", value: "  • Standard library modules" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Command-line interface for task management" },
    { type: "output", value: "  • Task categorization and organization" },
    { type: "output", value: "  • JSON-based data storage" },
    { type: "output", value: "  • Task records display and management" },
    { type: "output", value: "  • Simple and intuitive CLI commands" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • Python programming fundamentals" },
    { type: "output", value: "  • File handling and JSON manipulation" },
    { type: "output", value: "  • CLI application design" },
    { type: "output", value: "  • Data persistence" },
    { type: "output", value: "" },
    { type: "output", value: "Status:  Completed" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "task-tracker-desktop": [
    { type: "output", value: "Task Tracker – Desktop App" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Repository: https://github.com/niicommey01/Task-Tracker-App" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A cross-platform desktop application for task management built with" },
    { type: "output", value: "  Python and PyQt5. This project showcases GUI development skills and" },
    { type: "output", value: "  cross-platform application design." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • Python 3.x" },
    { type: "output", value: "  • PyQt5 for GUI framework" },
    { type: "output", value: "  • JSON for data persistence" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Cross-platform desktop application (Linux & Windows)" },
    { type: "output", value: "  • Modern GUI built with PyQt5" },
    { type: "output", value: "  • JSON-based task storage" },
    { type: "output", value: "  • Intuitive user interface" },
    { type: "output", value: "  • Task management and organization" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • GUI application development" },
    { type: "output", value: "  • PyQt5 framework proficiency" },
    { type: "output", value: "  • Cross-platform development" },
    { type: "output", value: "  • Desktop application architecture" },
    { type: "output", value: "" },
    { type: "output", value: "Status: Completed" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "mental-game": [
    { type: "output", value: "Mental Game (Terminal Version)" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Repository: https://github.com/niicommey01/MentalGame" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A console-based game application developed in C#. This project" },
    { type: "output", value: "  demonstrates object-oriented programming principles, game logic" },
    { type: "output", value: "  implementation, and C# language proficiency." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • C# (.NET)" },
    { type: "output", value: "  • Console Application" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Console-based game interface" },
    { type: "output", value: "  • Game logic implemented in C#" },
    { type: "output", value: "  • Text-based game mechanics" },
    { type: "output", value: "  • Interactive terminal gameplay" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • C# programming" },
    { type: "output", value: "  • Object-oriented programming" },
    { type: "output", value: "  • Game development fundamentals" },
    { type: "output", value: "  • Console application design" },
    { type: "output", value: "" },
    { type: "output", value: "Status:  Completed" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "fallen-angel": [
    { type: "output", value: "Fallen Angel – Online Clothing Brand Startup" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A full-stack e-commerce platform for an online clothing brand." },
    { type: "output", value: "  This project demonstrates expertise in building scalable web" },
    { type: "output", value: "  applications with modern frameworks and payment integration." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • Frontend: React" },
    { type: "output", value: "  • Backend: Django" },
    { type: "output", value: "  • Database: PostgreSQL" },
    { type: "output", value: "  • APIs: REST APIs" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Full-stack web application" },
    { type: "output", value: "  • Django backend with REST API" },
    { type: "output", value: "  • React frontend for user interface" },
    { type: "output", value: "  • Google & Facebook OAuth integration" },
    { type: "output", value: "  • Paystack payment system integration" },
    { type: "output", value: "  • PostgreSQL database for data persistence" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • Full-stack development" },
    { type: "output", value: "  • Django framework expertise" },
    { type: "output", value: "  • React frontend development" },
    { type: "output", value: "  • OAuth authentication" },
    { type: "output", value: "  • Payment gateway integration" },
    { type: "output", value: "  • Database design and management" },
    { type: "output", value: "" },
    { type: "output", value: "Status:  In Progress" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "causehive": [
    { type: "output", value: "CauseHive - A Donation Platform" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A web-based donation platform that enables users to create" },
    { type: "output", value: "  campaigns and receive donations. Built with modern web technologies" },
    { type: "output", value: "  and secure payment processing." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • Frontend: React" },
    { type: "output", value: "  • Backend: Django" },
    { type: "output", value: "  • Database: PostgreSQL" },
    { type: "output", value: "  • APIs: REST APIs" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Campaign creation and management" },
    { type: "output", value: "  • Django REST API backend" },
    { type: "output", value: "  • React-based user interface" },
    { type: "output", value: "  • Google OAuth authentication" },
    { type: "output", value: "  • Paystack payment integration" },
    { type: "output", value: "  • Secure donation processing" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • Full-stack web development" },
    { type: "output", value: "  • Django backend development" },
    { type: "output", value: "  • React frontend development" },
    { type: "output", value: "  • OAuth implementation" },
    { type: "output", value: "  • Payment processing integration" },
    { type: "output", value: "  • Database design" },
    { type: "output", value: "" },
    { type: "output", value: "Status:  In Progress" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "airline-database": [
    { type: "output", value: "Airline Database" },
    { type: "output", value: "═══════════════════════════════════════════════════════════" },
    { type: "output", value: "" },
    { type: "output", value: "Description:" },
    { type: "output", value: "  A comprehensive database design project for an airline management" },
    { type: "output", value: "  system. This project demonstrates database design skills, ERD" },
    { type: "output", value: "  creation, and relational database implementation." },
    { type: "output", value: "" },
    { type: "output", value: "Tech Stack:" },
    { type: "output", value: "  • MySQL" },
    { type: "output", value: "  • MySQL Workbench" },
    { type: "output", value: "" },
    { type: "output", value: "Features:" },
    { type: "output", value: "  • Entity-Relationship Diagram (ERD) design" },
    { type: "output", value: "  • Relational database schema" },
    { type: "output", value: "  • Normalized database structure" },
    { type: "output", value: "  • Table relationships and constraints" },
    { type: "output", value: "" },
    { type: "output", value: "Key Skills Demonstrated:" },
    { type: "output", value: "  • Database design and modeling" },
    { type: "output", value: "  • ERD creation" },
    { type: "output", value: "  • MySQL database management" },
    { type: "output", value: "  • Relational database concepts" },
    { type: "output", value: "  • SQL schema design" },
    { type: "output", value: "" },
    { type: "output", value: "Status:  Completed" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
};

// File contents for cat command
const fileContents = {
  "about.txt": terminalData.about,
  "contact.txt": terminalData.contact,
  "projects.txt": terminalData.projects,
  "skills.txt": terminalData.skills,
  "README.md": terminalData.readme,
  "resume.pdf": terminalData.resume,
  // Project files
  "task-tracker-cli.txt": projectDetails["task-tracker-cli"],
  "task-tracker-desktop.txt": projectDetails["task-tracker-desktop"],
  "mental-game.txt": projectDetails["mental-game"],
  "fallen-angel.txt": projectDetails["fallen-angel"],
  "causehive.txt": projectDetails["causehive"],
  "airline-database.txt": projectDetails["airline-database"],
  "secret-diary.txt": [
    { type: "output", value: "----- SECRET DIARY -----" },
    { type: "output", value: "Note to self: Coffee + Lo-fi = shipping features." },
    { type: "output", value: "Also: never deploy on Fridays. Ever." },
    { type: "output", value: "Root privileges feel nice. " },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
  "now_playing.sh": [
    { type: "output", value: "#!/bin/bash" },
    { type: "output", value: "# Now Playing - Display Spotify card from NPC API" },
    { type: "output", value: "" },
    { type: "output", value: "echo 'Fetching now playing card...'" },
    { type: "output", value: "echo ''" },
    { type: "output", value: "echo '🎵 Now Playing Card (Dark Theme - Horizontal)'" },
    { type: "output", value: "echo 'https://npc-api.aikins.xyz/v1/users/niicommey01/card.png?theme=dark&orientation=horizontal'" },
    { type: "output", value: "echo ''" },
    // { type: "output", value: "echo 'Profile: https://npc.aikins.xyz/u/niicommey01'" },
    { type: "output", value: "" },
    { type: "output", value: "" },
  ],
};

const commands = {
  "help": "help",
  "whoami": "whoami",
  "pwd": "pwd",
  "ls": "ls",
  "cd": "cd",
  "cat": "cat",
  "touch": "touch",
  "mkdir": "mkdir",
  "rm": "rm",
  "rmdir": "rmdir",
  "mv": "mv",
  "cp": "cp",
  "less": "less",
  "more": "more",
  "head": "head",
  "tail": "tail",
  "grep": "grep",
  "find": "find",
  "uname": "uname",
  "ps": "ps",
  "su": "su",
  "nuke": "nuke",
  "echo": "echo",
  "date": "date",
  "neofetch": "neofetch",
  "sudo": "sudo",
  "clear": "clear",
  "cls": "clear",
  "exit": "exit",
  "logout": "logout",
  "history": "history",
  "alias": "alias",
  "type": "type",
  "export": "export",
  "env": "env",
  "which": "which",
  "man": "man",
  "true": "true",
  "false": "false",
  "test": "test",
  "[": "test",
  "unalias": "unalias",
  "printenv": "printenv",
  "basename": "basename",
  "dirname": "dirname",
  "ifconfig": "ifconfig",
  "ip": "ip",
  "hostname": "hostname",
  "ping": "ping",
  "curl": "curl",
  "wget": "wget",
  "myip": "myip",
  "bash": "bash",
  "sh": "sh",
  "open": "open",
};

const allCommands = Object.keys(commands);

// Terminal prompt configuration
const prompt = {
  user: "nii",
  hostname: "portfolio",
  separator: "$",
};

const getSystemInfo = () => {
  const now = new Date();
  const dateStr = now.toUTCString();
  const year = now.getFullYear();
  return `Nii v0.1 portfolio-host 6.17.0-8-generic #${year} ${dateStr} x86_64 x86_64 x86_64 GNU/Linux`;
};

// Helper function to resolve path
function resolvePath(currentPath, targetPath) {
  if (!targetPath || targetPath === "") return currentPath;
  if (targetPath.startsWith("/")) return targetPath;
  
  const parts = currentPath.split("/").filter(p => p);
  const targetParts = targetPath.split("/").filter(p => p);
  
  for (const part of targetParts) {
    if (part === "..") {
      if (parts.length > 0) parts.pop();
    } else if (part === "." || part === "") {
      continue;
    } else {
      parts.push(part);
    }
  }
  
  return "/" + parts.join("/");
}

// Helper function to get directory contents (uses state)
function getDirectoryContents(path, fs = fileSystem) {
  const parts = path.split("/").filter(p => p);
  let current = fs["/"];
  
  for (const part of parts) {
    if (current && current.contents && current.contents[part]) {
      current = current.contents[part];
    } else {
      return null;
    }
  }
  
  return current && current.type === "directory" ? current.contents : null;
}

// Helper function to get file/directory at path
function getPathItem(path, fs = fileSystem) {
  const parts = path.split("/").filter(p => p);
  let current = fs["/"];
  
  for (const part of parts) {
    if (current && current.contents && current.contents[part]) {
      current = current.contents[part];
    } else {
      return null;
    }
  }
  
  return current;
}

// Helper function to get parent directory
function getParentDirectory(path, fs = fileSystem) {
  const parts = path.split("/").filter(p => p);
  if (parts.length === 0) return fs["/"];
  
  const parentPath = "/" + parts.slice(0, -1).join("/");
  return getDirectoryContents(parentPath, fs);
}

// Helper function to get filename from path
function getFilename(path) {
  const parts = path.split("/").filter(p => p);
  return parts[parts.length - 1] || "";
}

// Helper function to format ls output
function formatLsOutput(contents, showAll = false, longFormat = false) {
  if (!contents) return [];
  
  const items = Object.keys(contents)
    .filter(name => showAll || !name.startsWith("."))
    .sort((a, b) => {
      const aIsDir = contents[a].type === "directory";
      const bIsDir = contents[b].type === "directory";
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });
  
  return items.map(name => {
    const item = contents[name];
    const isDir = item.type === "directory";
    if (!longFormat) {
      return {
        name,
        isDir,
        display: isDir ? `\x1b[34m${name}\x1b[0m` : name, // Blue for directories
      };
    }
    // long format (-l)
    const perm = item.perm || (isDir ? "drwxr-xr-x" : "-rw-r--r--");
    const owner = item.owner || "nii";
    const size = item.size || 1024;
    const mtime = item.mtime || "Dec 11 11:41";
    const paddedPerm = perm.padEnd(11, " ");
    const paddedOwner = owner.padEnd(8, " ");
    const paddedSize = size.toString().padStart(6, " ");
    const displayName = isDir ? `\x1b[34m${name}\x1b[0m` : name;
    return {
      name,
      isDir,
      display: `${paddedPerm} 1 ${paddedOwner} ${paddedOwner} ${paddedSize} ${mtime} ${displayName}`,
    };
  });
}

// Permission check
function hasPermission(item, isRootUser) {
  if (!item) return false;
  if (isRootUser) return true;
  if (item.rootOnly) return false;
  return true;
}

function renderOutputLine(item) {
  // Handle image type
  if (item.type === "image") {
    const imgElement = (
      <img 
        src={item.value} 
        alt={item.alt || "Terminal image"} 
        style={{
          maxWidth: item.maxWidth || '600px',
          width: '100%',
          height: 'auto',
          display: 'block',
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          cursor: item.link ? 'pointer' : 'default',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (item.link) {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (item.link) {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
          }
        }}
      />
    );
    
    if (item.link) {
      return (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          {imgElement}
        </a>
      );
    }
    
    return imgElement;
  }
  
  if (Array.isArray(item.value)) {
    return (
      <span>
        {item.label ? item.label + ": " : ""}
        {item.value.map((v, i) => (
          <React.Fragment key={i}>
            <a
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link"
            >
              {v.text}
            </a>
            {i < item.value.length - 1 ? " || " : ""}
          </React.Fragment>
        ))}
      </span>
    );
  }
  if (item.value && typeof item.value === "object" && item.value.href) {
    return (
      <span>
        {item.label ? item.label + ": " : ""}
        <a
          href={item.value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link"
        >
          {item.value.text}
        </a>
      </span>
    );
  }
  
  // Handle ANSI color codes for ls output
  let text = item.value || "";
  if (text.includes("\x1b[34m")) {
    // eslint-disable-next-line no-control-regex
    const parts = text.split(/(\x1b\[34m.*?\x1b\[0m)/);
  return (
    <span>
        {parts.map((part, i) => {
          if (part.startsWith("\x1b[34m") && part.endsWith("\x1b[0m")) {
            // eslint-disable-next-line no-control-regex
            const dirName = part.replace(/\x1b\[34m|\x1b\[0m/g, "");
            return <span key={i} className="ls-directory">{dirName}</span>;
          }
          return <span key={i}>{part}</span>;
        })}
    </span>
  );
  }
  
  return <span>{text}</span>;
}

function formatDisplayPath(path) {
  if (!path) return "";
  if (path === "/home/nii") return "~";
  if (path.startsWith("/home/nii/")) return `~/${path.replace("/home/nii/", "")}`;
  return path;
}

function getPrompt(currentPath, currentUser, isAuthenticated, isRoot) {
  if (!currentPath) return "";
  if (!currentUser || !isAuthenticated) {
    return "portfolio login:";
  }
  const displayPath = formatDisplayPath(currentPath);
  const user = isRoot ? "root" : currentUser || prompt.user;
  const sep = isRoot ? "#" : prompt.separator;
  return `${user}@${prompt.hostname}:${displayPath}${sep}`;
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
  );
}

// Get browser and OS information
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown";
  
  // Detect browser
  if (ua.indexOf("Firefox") > -1) {
    browser = "Firefox";
  } else if (ua.indexOf("Chrome") > -1) {
    browser = "Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    browser = "Safari";
  } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
    browser = "Edge";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browser = "Opera";
  }
  
  // Detect OS
  if (ua.indexOf("Windows") > -1) {
    os = "Windows";
  } else if (ua.indexOf("Mac") > -1) {
    os = "macOS";
  } else if (ua.indexOf("Linux") > -1) {
    os = "Linux";
  } else if (ua.indexOf("Android") > -1) {
    os = "Android";
  } else if (ua.indexOf("iOS") > -1 || ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) {
    os = "iOS";
  }
  
  return { browser, os };
}

// Fetch user's public IP and location
async function fetchUserIpInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      timezone: data.timezone,
      isp: data.org,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    // Fallback to ipify if ipapi fails
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return { ip: data.ip };
    } catch (err) {
      return null;
    }
  }
}

// Helper function to format time in mm:ss
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to truncate text to fit in box
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text.padEnd(maxLength, ' ');
  }
  return text.substring(0, maxLength - 3) + '...';
}

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessages, setBootMessages] = useState([]);
  const [history, setHistory] = useState([...terminalData.welcome]);
  const [input, setInput] = useState("");
  const [caretPos, setCaretPos] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState("/home/nii");
  const [fileSystemState, setFileSystemState] = useState(() => {
    // Deep clone the file system for state management
    return JSON.parse(JSON.stringify(fileSystem));
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState("username"); // username -> password
  const [pendingUser, setPendingUser] = useState("");
  const [currentUser, setCurrentUser] = useState("guest");
  const [isRoot, setIsRoot] = useState(false);
  const [suPrompt, setSuPrompt] = useState(false);
  const [aliases, setAliases] = useState({});
  const [envVars, setEnvVars] = useState({
    USER: "nii",
    HOME: "/home/nii",
    PATH: "/usr/local/bin:/usr/bin:/bin",
    SHELL: "/bin/bash",
    TERM: "xterm-256color",
    LANG: "en_US.UTF-8",
  });
  const [userIpInfo, setUserIpInfo] = useState(null);
  const [isLoadingIp, setIsLoadingIp] = useState(false);
  const [nowPlayingCacheTime, setNowPlayingCacheTime] = useState(null);

  const terminalEndRef = useRef(null);
  const inputLineRef = useRef(null);
  const bootMessagesRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll the window to the bottom to show new command output
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    });
  };

  const scrollBootMessagesToBottom = () => {
    // Scroll the window to the bottom to reveal new boot messages
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      });
    });
  };

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;

    const bootSequence = [
      { delay: 150, message: "[    0.000000] Linux version 6.17.0-8-generic" },
      { delay: 200, message: "[    0.150000] Command line: BOOT_IMAGE=/vmlinuz-6.17.0-8-generic" },
      { delay: 180, message: "[    0.350000] KERNEL supported cpus:" },
      { delay: 150, message: "[    0.530000]   Intel GenuineIntel" },
      { delay: 150, message: "[    0.680000]   AMD AuthenticAMD" },
      { delay: 200, message: "[    0.830000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'" },
      { delay: 180, message: "[    1.030000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'" },
      { delay: 150, message: "[    1.210000] BIOS-provided physical RAM map:" },
      { delay: 200, message: "[    1.360000] e820: BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable" },
      { delay: 180, message: "[    1.560000] e820: BIOS-e820: [mem 0x0000000000100000-0x000000007ffdffff] usable" },
      { delay: 200, message: "[    1.740000] NX (Execute Disable) protection: active" },
      { delay: 180, message: "[    1.940000] SMBIOS 3.2 present." },
      { delay: 150, message: "[    2.120000] DMI: Portfolio Terminal" },
      { delay: 200, message: "[    2.270000] tsc: Detected 2400.000 MHz processor" },
      { delay: 180, message: "[    2.470000] Calibrating delay loop... 4800.00 BogoMIPS" },
      { delay: 150, message: "[    2.650000] pid_max: default: 32768 minimum: 301" },
      { delay: 200, message: "[    2.800000] Security Framework initialized" },
      { delay: 180, message: "[    3.000000] Mount-cache hash table entries: 16384" },
      { delay: 150, message: "[    3.180000] Mountpoint-cache hash table entries: 16384" },
      { delay: 200, message: "[    3.330000] CPU: Physical Processor ID: 0" },
      { delay: 180, message: "[    3.530000] mce: CPU supports 10 MCE banks" },
      { delay: 150, message: "[    3.710000] process: using mwait in idle threads" },
      { delay: 200, message: "[    3.860000] Spectre V1 : Mitigation: usercopy/swapgs barriers and __user pointer sanitization" },
      { delay: 180, message: "[    4.060000] Spectre V2 : Mitigation: Retpolines, IBPB: conditional, IBRS_FW, STIBP: conditional, RSB filling" },
      { delay: 150, message: "[    4.240000] Speculative Store Bypass: Vulnerable" },
      { delay: 200, message: "[    4.390000] Freeing SMP alternatives memory: 40K" },
      { delay: 180, message: "[    4.590000] smpboot: Allowing 4 CPUs, 0 hotplug CPUs" },
      { delay: 150, message: "[    4.770000] x86: Booting SMP configuration:" },
      { delay: 200, message: "[    4.920000] .... node  #0, CPUs:      #1   #2   #3   #4" },
      { delay: 180, message: "[    5.120000] MDS: Mitigation: Clear CPU buffers" },
      { delay: 150, message: "[    5.300000] TAA: Mitigation: TSX disabled" },
      { delay: 200, message: "[    5.450000] Freeing initrd memory: 16384K" },
      { delay: 180, message: "[    5.650000] PCI: CLS 64 bytes, default 64" },
      { delay: 150, message: "[    5.830000] clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 19112604462750000 ns" },
      { delay: 200, message: "[    5.980000] futex hash table entries: 4096 (order: 3, 32768 bytes, vmalloc)" },
      { delay: 180, message: "[    6.180000] pinctrl core: initialized pinctrl subsystem" },
      { delay: 150, message: "[    6.360000] RTC time: 2025-01-27 00:00:00" },
      { delay: 200, message: "[    6.510000] NET: Registered protocol family 16" },
      { delay: 180, message: "[    6.710000] audit: initializing netlink subsys (disabled)" },
      { delay: 150, message: "[    6.890000] audit: type=2000 audit(1706313600.000:1): state=initialized audit_enabled=0 res=1" },
      { delay: 200, message: "[    7.040000] workingset: timestamp_bits=62 max_order=20 bucket_order=0" },
      { delay: 180, message: "[    7.240000] zbud: loaded" },
      { delay: 150, message: "[    7.420000] Initializing cgroup subsys cpuset" },
      { delay: 200, message: "[    7.570000] Initializing cgroup subsys cpu" },
      { delay: 180, message: "[    7.770000] Initializing cgroup subsys cpuacct" },
      { delay: 300, message: "[    7.950000] Starting kernel..." },
      { delay: 400, message: "[    8.250000] Loading portfolio terminal..." },
      { delay: 350, message: "[    8.650000] Initializing file system..." },
      { delay: 300, message: "[    9.000000] Mounting /home/nii..." },
      { delay: 400, message: "[    9.300000] Starting terminal service..." },
      { delay: 500, message: "[    9.700000] Welcome to Nii's Portfolio Terminal!" },
    ];

    let currentIndex = 0;
    let totalTime = 0;

    const addMessage = (message) => {
      setBootMessages(prev => [...prev, message]);
      const newProgress = Math.min((currentIndex + 1) * (100 / bootSequence.length), 100);
      setBootProgress(newProgress);
    };

    const processBoot = () => {
      if (currentIndex < bootSequence.length) {
        const item = bootSequence[currentIndex];
        totalTime += item.delay;
        
        setTimeout(() => {
          addMessage(item.message);
          currentIndex++;
          processBoot();
        }, item.delay);
      } else {
        setTimeout(() => {
          setIsBooting(false);
        }, 500);
      }
    };

    processBoot();
  }, [isBooting]);

  // Auto-scroll boot messages when they update or progress changes
  useEffect(() => {
    if (isBooting && bootMessages.length > 0) {
      // Use multiple timeouts to ensure scroll happens after DOM updates
      const timeoutId1 = setTimeout(() => {
        scrollBootMessagesToBottom();
      }, 50);
      const timeoutId2 = setTimeout(() => {
        scrollBootMessagesToBottom();
      }, 150);
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [bootMessages, bootProgress, isBooting]);

  // Keep input area visible while typing (removed to prevent auto-scroll on typing)
  // useEffect(() => {
  //   if (!isBooting) {
  //   scrollToBottom();
  //   }
  // }, [input, caretPos, isBooting]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileDevice());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isInputFocused && inputLineRef.current && !isBooting) {
      inputLineRef.current.focus();
    }
  }, [isInputFocused, isBooting]);

  const handleKeyDown = (e) => {
    const inputs = commandHistory;
    
    // Prevent all keys from scrolling the page
    e.preventDefault();
    
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        handleCommand(input);
        setCommandHistory(prev => [...prev, input]);
        setInput("");
        setCaretPos(0);
        setHistoryIndex(null);
      }
    } else if (e.key === "Backspace") {
      if (caretPos > 0) {
        setInput((prev) => prev.slice(0, caretPos - 1) + prev.slice(caretPos));
        setCaretPos((pos) => pos - 1);
      }
      setHistoryIndex(null);
    } else if (e.key === "Delete") {
      if (caretPos < input.length) {
        setInput((prev) => prev.slice(0, caretPos) + prev.slice(caretPos + 1));
      }
    } else if (e.key === "ArrowLeft") {
      setCaretPos((pos) => Math.max(0, pos - 1));
    } else if (e.key === "ArrowRight") {
      setCaretPos((pos) => Math.min(input.length, pos + 1));
    } else if (e.key === "Home") {
      setCaretPos(0);
    } else if (e.key === "End") {
      setCaretPos(input.length);
    } else if (e.key === "Tab") {
      const parts = input.trim().split(/\s+/);
      const command = parts[0].toLowerCase();
      const arg = parts[1] || "";
      
      // Tab completion for commands
      if (parts.length === 1 || (parts.length === 2 && !arg)) {
        const matches = allCommands.filter(cmd => cmd.startsWith(command));
      if (matches.length === 1) {
          setInput(matches[0] + (parts.length === 1 ? "" : " " + arg));
          setCaretPos(matches[0].length + (parts.length === 1 ? 0 : arg.length + 1));
      } else if (matches.length > 1) {
        setHistory((h) => [
          ...h,
          { type: "input", value: input },
          { type: "output", value: matches.join("    ") }
        ]);
        }
      } else if (["cd", "cat", "ls", "touch", "rm", "rmdir", "less", "more", "head", "tail", "grep", "find"].includes(command)) {
        // Tab completion for files/directories
        const contents = getDirectoryContents(currentPath, fileSystemState);
        if (contents) {
          const matches = Object.keys(contents).filter(name => name.startsWith(arg));
          if (matches.length === 1) {
            const newInput = command + " " + matches[0];
            setInput(newInput);
            setCaretPos(newInput.length);
          } else if (matches.length > 1) {
            setHistory((h) => [
              ...h,
              { type: "input", value: input },
              { type: "output", value: matches.join("    ") }
            ]);
          }
        }
      }
    } else if (e.key === "ArrowUp") {
      if (inputs.length === 0) return;
      const idx = historyIndex === null ? inputs.length - 1 : Math.max(0, historyIndex - 1);
      setInput(inputs[idx]);
      setCaretPos(inputs[idx].length);
      setHistoryIndex(idx);
    } else if (e.key === "ArrowDown") {
      if (inputs.length === 0) return;
      const idx = historyIndex === null ? inputs.length - 1 : Math.min(inputs.length - 1, historyIndex + 1);
      if (idx === inputs.length - 1) {
        setInput("");
        setCaretPos(0);
        setHistoryIndex(null);
      } else {
      setInput(inputs[idx]);
      setCaretPos(inputs[idx].length);
      setHistoryIndex(idx);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setInput((prev) => prev.slice(0, caretPos) + e.key + prev.slice(caretPos));
      setCaretPos((pos) => pos + 1);
      setHistoryIndex(null);
    }
    // Removed scrollToBottom() call to prevent auto-scroll while typing
  };
  
  const handleCommand = (cmd) => {
    let trimmed = cmd.trim();
    
    // Check for alias expansion
    const firstWord = trimmed.split(/\s+/)[0];
    if (aliases[firstWord]) {
      trimmed = trimmed.replace(firstWord, aliases[firstWord]);
    }
    
    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle login flow if not authenticated
    if (!isAuthenticated) {
      if (authStep === "username") {
        setPendingUser(trimmed || "guest");
        setAuthStep("password");
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Password:" },
        ]);
        return;
      } else if (authStep === "password") {
        setIsAuthenticated(true);
        const user = pendingUser || "guest";
        setCurrentUser(user);
        setEnvVars(prev => ({ ...prev, USER: user }));
        setIsRoot(false);
        setAuthStep("username");
        setHistory((h) => [
          ...h,
          { type: "input", value: "********" },
          { type: "output", value: "" },
          { type: "output", value: `Welcome ${pendingUser || "guest"}!` },
          ...terminalData.welcome,
      ]);
      return;
    }
    }

    // Handle su password prompt
    if (suPrompt) {
      if (trimmed === "niicommey01") {
        setIsRoot(true);
        setCurrentUser("root");
        setEnvVars(prev => ({ ...prev, USER: "root", HOME: "/root" }));
        setHistory((h) => [
          ...h,
          { type: "input", value: "********" },
          { type: "output", value: "root@portfolio:~# session opened." },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: "********" },
          { type: "output", value: "su: Authentication failure" },
        ]);
      }
      setSuPrompt(false);
      return;
    }

    if (commands[command] === "clear") {
      setHistory([...terminalData.welcome]);
      return;
    }

    if (commands[command] === "exit") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "logout" },
      ]);
      setTimeout(() => {
        window.close();
      }, 500);
      return;
    }

    // Handle shell script execution (./script.sh or bash script.sh)
    if (command.startsWith("./") && command.endsWith(".sh")) {
      const scriptName = command.substring(2);
      const scriptPath = resolvePath(currentPath, scriptName);
      const file = getPathItem(scriptPath, fileSystemState);
      
      if (file && file.type === "file" && scriptName === "now_playing.sh") {
        // Cache logic: refresh every 3 minutes
        const currentTime = Date.now();
        const threeMinutes = 3 * 60 * 1000; // 3 minutes in milliseconds
        let cacheTimestamp = nowPlayingCacheTime;
        
        if (!nowPlayingCacheTime || (currentTime - nowPlayingCacheTime) >= threeMinutes) {
          // Update cache timestamp
          cacheTimestamp = currentTime;
          setNowPlayingCacheTime(currentTime);
        }
        
        // Append cache-busting timestamp to force refresh
        const imageUrl = `https://npc-api.aikins.xyz/v1/users/niicommey01/card.png?theme=dark&orientation=horizontal&t=${cacheTimestamp}`;
        
        const output = [
          { type: "input", value: cmd },
          { type: "output", value: "" },
          { type: "output", value: "♫ Loading Spotify Now Playing Card..." },
          { type: "output", value: "" },
          { 
            type: "image", 
            value: imageUrl,
            alt: "Spotify Now Playing",
            maxWidth: "600px",
            link: "https://npc.aikins.xyz/u/niicommey01"
          },
          { type: "output", value: "" },
          // { type: "output", value: "🌐 Profile: https://npc.aikins.xyz/u/niicommey01" },
          { type: "output", value: "" },
        ];
        
        setHistory((h) => [...h, ...output]);
        return;
      } else if (file && file.type === "file") {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `bash: ${scriptName}: Executing...` },
          { type: "output", value: "This is a shell script. Use 'cat' to view its contents." },
        ]);
        return;
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `bash: ${scriptName}: No such file or directory` },
        ]);
        return;
      }
    }

    // Handle bash/sh command with script file
    if ((command === "bash" || command === "sh") && args.length > 0 && args[0].endsWith(".sh")) {
      const scriptName = args[0];
      const scriptPath = resolvePath(currentPath, scriptName);
      const file = getPathItem(scriptPath, fileSystemState);
      
      if (file && file.type === "file" && scriptName === "now_playing.sh") {
        // Cache logic: refresh every 3 minutes
        const currentTime = Date.now();
        const threeMinutes = 3 * 60 * 1000; // 3 minutes in milliseconds
        let cacheTimestamp = nowPlayingCacheTime;
        
        if (!nowPlayingCacheTime || (currentTime - nowPlayingCacheTime) >= threeMinutes) {
          // Update cache timestamp
          cacheTimestamp = currentTime;
          setNowPlayingCacheTime(currentTime);
        }
        
        // Append cache-busting timestamp to force refresh
        const imageUrl = `https://npc-api.aikins.xyz/v1/users/niicommey01/card.png?theme=dark&orientation=horizontal&t=${cacheTimestamp}`;
        
        const output = [
          { type: "input", value: cmd },
          { type: "output", value: "" },
          { type: "output", value: "♫ Loading Spotify Now Playing Card..." },
          { type: "output", value: "" },
          { 
            type: "image", 
            value: imageUrl,
            alt: "Spotify Now Playing",
            maxWidth: "600px",
            link: "https://npc.aikins.xyz/u/niicommey01"
          },
          { type: "output", value: "" },
          // { type: "output", value: "🌐 Profile: https://npc.aikins.xyz/u/niicommey01" },
          { type: "output", value: "" },
        ];
        
        setHistory((h) => [...h, ...output]);
        return;
      } else if (file && file.type === "file") {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `${command}: ${scriptName}: Executing...` },
          { type: "output", value: "This is a shell script. Use 'cat' to view its contents." },
        ]);
        return;
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `${command}: ${scriptName}: No such file or directory` },
        ]);
        return;
      }
    }

    if (command === "cd") {
      const targetPath = args[0] || "~";
      let newPath;
      
      
      if (targetPath === "~" || targetPath === "~/" || !targetPath) {
        newPath = "/home/nii";
    } else {
        newPath = resolvePath(currentPath, targetPath);
      }
      
      const contents = getDirectoryContents(newPath, fileSystemState);
      if (contents !== null) {
        setCurrentPath(newPath);
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "" },
        { type: "output", value: "" },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `bash: cd: ${args[0]}: No such file or directory` },
          { type: "output", value: "" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    if (command === "ls") {
      const targetPath = args[0] ? resolvePath(currentPath, args[0]) : currentPath;
      const contents = getDirectoryContents(targetPath, fileSystemState);
      
      if (contents === null) {
        const errorPath = args[0] || targetPath;
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `ls: cannot access '${errorPath}': No such file or directory` },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const long = args.includes("-l");
        const items = formatLsOutput(contents, args.includes("-a") || args.includes("--all"), long);
        const output = items.map(item => item.display).join(long ? "\n" : "  ");
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: output || "" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    if (command === "cat") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "cat: missing file operand" },
          { type: "output", value: "Try 'cat --help' for more information." },
        ]);
        return;
      }
      
      const filepath = args[0];
      // Handle relative paths (files in subdirectories)
      let filename = filepath;
      if (filepath.includes("/")) {
        // Extract just the filename for lookup
        filename = filepath.split("/").pop();
      }
      
      // Check if file exists in current directory or fileContents
      const currentDir = getDirectoryContents(currentPath, fileSystemState);
      let fileFound = false;
      
      if (currentDir && currentDir[filename] && currentDir[filename].type === "file") {
        // File exists in current directory
        const contentKey = currentDir[filename].content;
        if (!hasPermission(currentDir[filename], isRoot)) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `cat: ${filename}: Permission denied` },
          ]);
          return;
        }
        if (fileContents[contentKey] || fileContents[filename]) {
          fileFound = true;
          const content = fileContents[contentKey] || fileContents[filename];
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            ...content,
          ]);
        }
      } else if (fileContents[filename]) {
        // File exists in fileContents (root level files)
        fileFound = true;
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...fileContents[filename],
        ]);
      }
      
      if (!fileFound) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `cat: ${filepath}: No such file or directory` },
        ]);
      }
      return;
    }

    if (command === "echo") {
      let text = args.join(" ");
      // Support environment variable expansion ($VAR or ${VAR})
      text = text.replace(/\$\{?(\w+)\}?/g, (match, varName) => {
        return envVars[varName] || match;
      });
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: text },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    if (command === "uname") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: getSystemInfo() },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    if (command === "ps") {
      const processes = [
        "1001 ?        00:00:00 procrastinator",
        "1020 ?        00:00:00 coffee-daemon",
        "1050 ?        00:00:00 portfolio-renderer",
        "1100 ?        00:00:00 spotify-helper",
        "1200 ?        00:00:00 idea-generator",
      ];
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "USER       PID  %CPU %MEM COMMAND" },
        ...processes.map(p => ({ type: "output", value: p })),
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    if (command === "su") {
      if (args[0] === "root") {
        setSuPrompt(true);
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Password:" },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "su: user not found" },
        ]);
      }
      return;
    }

    if (command === "nuke") {
      if (!isRoot) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "nuke: Permission denied (root required)" },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Launching virtual warheads..." },
          { type: "output", value: "Just kidding. Portfolio safe mode engaged." },
        ]);
      }
      return;
    }

    if (command === "date") {
      const now = new Date();
      const dateStr = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: dateStr },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    if (command === "neofetch") {
      const browserInfo = getBrowserInfo();
      const output = [
        { type: "output", value: "" },
        { type: "output", value: "       ███╗   ██╗██╗██╗" },
        { type: "output", value: "       ████╗  ██║██║██║" },
        { type: "output", value: "       ██╔██╗ ██║██║██║" },
        { type: "output", value: "       ██║╚██╗██║╚═╝╚═╝" },
        { type: "output", value: "       ██║ ╚████║██╗██╗" },
        { type: "output", value: "       ╚═╝  ╚═══╝╚═╝╚═╝" },
        { type: "output", value: "" },
        { type: "output", value: `OS: ${browserInfo.os}` },
        { type: "output", value: "Host: Portfolio Terminal" },
        { type: "output", value: `Browser: ${browserInfo.browser}` },
        { type: "output", value: `Resolution: ${window.screen.width}x${window.screen.height}` },
        { type: "output", value: "Kernel: Nii v0.1 (6.17.0-8-generic)" },
        { type: "output", value: "Shell: bash" },
        { type: "output", value: `User: ${currentUser}` },
        { type: "output", value: `Language: ${navigator.language}` },
      ];
      
      // Add IP info if available
      if (userIpInfo) {
        output.push({ type: "output", value: `Public IP: ${userIpInfo.ip}` });
        if (userIpInfo.city && userIpInfo.country) {
          output.push({ type: "output", value: `Location: ${userIpInfo.city}, ${userIpInfo.country}` });
        }
      }
      
      output.push(
        { type: "output", value: "" },
        { type: "output", value: "Portfolio: Jude Nii Klemesu Commey" },
        { type: "output", value: "Languages: Python, JavaScript, C#, Java" },
        { type: "output", value: "Focus: Cybersecurity & Backend Development" }
      );
      
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...output,
      ]);
      return;
    }

    if (command === "sudo") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "usage: sudo -h | -K | -k | -V | -v | -l | -L | -H | -P | -S | -u username|#uid" },
          { type: "output", value: "            [-g groupname|#gid] [-p prompt] [-t timeout] [-C fd] [-r role]" },
          { type: "output", value: "            [-r type] [-T type] command" },
        ]);
      } else {
        if (!isRoot && args[0] === "nuke") {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: "sudo: not authorized. Try su root." },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `sudo: ${args.join(" ")}: command not found` },
            { type: "output", value: "Just kidding! This is a portfolio terminal. No sudo needed here. :)" },
          ]);
        }
      }
      return;
    }

    if (command === "pwd") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: currentPath },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // touch command - create empty file
    if (command === "touch") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "touch: missing file operand" },
          { type: "output", value: "Try 'touch --help' for more information." },
        ]);
        return;
      }
      
      const filename = args[0];
      const parentDir = getDirectoryContents(currentPath, fileSystemState);
      if (parentDir) {
        if (!parentDir[filename]) {
          setFileSystemState(prev => {
            const newFs = JSON.parse(JSON.stringify(prev));
            const dir = getDirectoryContents(currentPath, newFs);
            if (dir) {
              dir[filename] = { type: "file", content: "" };
            }
            return newFs;
          });
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
          ]);
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `touch: cannot touch '${filename}': No such file or directory` },
        ]);
      }
      return;
    }

    // mkdir command - create directory
    if (command === "mkdir") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "mkdir: missing operand" },
          { type: "output", value: "Try 'mkdir --help' for more information." },
        ]);
        return;
      }
      
      const dirname = args[0];
      const parentDir = getDirectoryContents(currentPath, fileSystemState);
      if (parentDir) {
        if (!parentDir[dirname]) {
          setFileSystemState(prev => {
            const newFs = JSON.parse(JSON.stringify(prev));
            const dir = getDirectoryContents(currentPath, newFs);
            if (dir) {
              dir[dirname] = { type: "directory", contents: {} };
            }
            return newFs;
          });
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `mkdir: cannot create directory '${dirname}': File exists` },
          ]);
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `mkdir: cannot create directory '${dirname}': No such file or directory` },
        ]);
      }
      return;
    }

    // rm command - remove file
    if (command === "rm") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "rm: missing operand" },
          { type: "output", value: "Try 'rm --help' for more information." },
        ]);
        return;
      }
      
      const filename = args[0];
      const parentDir = getDirectoryContents(currentPath, fileSystemState);
      if (parentDir && parentDir[filename]) {
        const item = parentDir[filename];
        if (item.type === "directory" && !args.includes("-r") && !args.includes("-rf")) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `rm: cannot remove '${filename}': Is a directory` },
          ]);
        } else {
          setFileSystemState(prev => {
            const newFs = JSON.parse(JSON.stringify(prev));
            const dir = getDirectoryContents(currentPath, newFs);
            if (dir) {
              delete dir[filename];
            }
            return newFs;
          });
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
          ]);
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `rm: cannot remove '${filename}': No such file or directory` },
        ]);
      }
      return;
    }

    // rmdir command - remove directory
    if (command === "rmdir") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "rmdir: missing operand" },
          { type: "output", value: "Try 'rmdir --help' for more information." },
        ]);
        return;
      }
      
      const dirname = args[0];
      const parentDir = getDirectoryContents(currentPath, fileSystemState);
      if (parentDir && parentDir[dirname]) {
        const item = parentDir[dirname];
        if (item.type === "directory") {
          if (Object.keys(item.contents).length === 0) {
            setFileSystemState(prev => {
              const newFs = JSON.parse(JSON.stringify(prev));
              const dir = getDirectoryContents(currentPath, newFs);
              if (dir) {
                delete dir[dirname];
              }
              return newFs;
            });
            setHistory((h) => [
              ...h,
              { type: "input", value: cmd },
            ]);
          } else {
            setHistory((h) => [
              ...h,
              { type: "input", value: cmd },
              { type: "output", value: `rmdir: failed to remove '${dirname}': Directory not empty` },
            ]);
          }
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `rmdir: failed to remove '${dirname}': Not a directory` },
          ]);
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `rmdir: failed to remove '${dirname}': No such file or directory` },
        ]);
      }
      return;
    }

    // less/more commands - paginated file viewer
    if (command === "less" || command === "more") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `${command}: missing file operand` },
        ]);
        return;
      }
      
      const filename = args[0];
      if (fileContents[filename]) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...fileContents[filename],
          { type: "output", value: `(END)` },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `${command}: ${filename}: No such file or directory` },
        ]);
      }
      return;
    }

    // head command - show first lines
    if (command === "head") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "head: missing operand" },
        ]);
        return;
      }
      
      const filename = args[0];
      const lines = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      if (fileContents[filename]) {
        const content = fileContents[filename].slice(0, lines);
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...content,
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `head: ${filename}: No such file or directory` },
        ]);
      }
      return;
    }

    // tail command - show last lines
    if (command === "tail") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "tail: missing operand" },
        ]);
        return;
      }
      
      const filename = args[0];
      const lines = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      if (fileContents[filename]) {
        const content = fileContents[filename].slice(-lines);
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...content,
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `tail: ${filename}: No such file or directory` },
        ]);
      }
      return;
    }

    // grep command - search in files
    if (command === "grep") {
      if (args.length < 2) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "grep: missing operand" },
        ]);
        return;
      }
      
      const pattern = args[0];
      const filename = args[1];
      if (fileContents[filename]) {
        const matches = fileContents[filename].filter(item => 
          item.value && item.value.toString().toLowerCase().includes(pattern.toLowerCase())
        );
        if (matches.length > 0) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            ...matches.map(m => ({ ...m, value: `${filename}: ${m.value}` })),
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
          ]);
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `grep: ${filename}: No such file or directory` },
        ]);
      }
      return;
    }

    // find command - find files
    if (command === "find") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "find: missing operand" },
        ]);
        return;
      }
      
      const searchPath = args[0] || currentPath;
      const namePattern = args.includes("-name") ? args[args.indexOf("-name") + 1] : null;
      const targetPath = resolvePath(currentPath, searchPath);
      const contents = getDirectoryContents(targetPath, fileSystemState);
      
      if (contents) {
        const matches = Object.keys(contents).filter(name => {
          if (namePattern) {
            const pattern = namePattern.replace(/\*/g, ".*");
            return new RegExp(`^${pattern}$`).test(name);
          }
          return true;
        });
        
        const outputLines = matches.map(match => ({ 
          type: "output",
          value: `${targetPath}/${match}` 
        }));
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...outputLines,
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `find: '${searchPath}': No such file or directory` },
        ]);
      }
      return;
    }

    // history command - show command history
    if (command === "history") {
      const historyLines = commandHistory.map((cmd, idx) => ({
        type: "output",
        value: `  ${(idx + 1).toString().padStart(4)}  ${cmd}`
      }));
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...historyLines,
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // alias command - create or show aliases
    if (command === "alias") {
      if (args.length === 0) {
        // Show all aliases
        const aliasLines = Object.keys(aliases).length === 0
          ? [{ type: "output", value: "No aliases defined" }]
          : Object.entries(aliases).map(([name, value]) => ({
              type: "output",
              value: `alias ${name}='${value}'`
            }));
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...aliasLines,
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        // Create alias (format: alias name='command')
        const aliasStr = args.join(" ");
        const match = aliasStr.match(/^(\w+)=['"](.+)['"]$/);
        if (match) {
          const [, name, value] = match;
          setAliases(prev => ({ ...prev, [name]: value }));
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `bash: alias: ${aliasStr}: invalid alias format` },
            { type: "output", value: "Usage: alias name='command'" },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        }
      }
      return;
    }

    // type command - describe command type
    if (command === "type") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "type: usage: type [-afptP] name [name ...]" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const cmdName = args[0];
        let typeInfo;
        
        if (aliases[cmdName]) {
          typeInfo = `${cmdName} is aliased to \`${aliases[cmdName]}'`;
        } else if (["cd", "echo", "export", "alias", "history", "type", "test", "[", "true", "false", "exit", "logout"].includes(cmdName)) {
          typeInfo = `${cmdName} is a shell builtin`;
        } else if (commands[cmdName]) {
          typeInfo = `${cmdName} is /usr/bin/${cmdName}`;
        } else {
          typeInfo = `bash: type: ${cmdName}: not found`;
        }
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: typeInfo },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // which command - show command path
    if (command === "which") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "which: no command specified" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const cmdName = args[0];
        let path;
        
        if (["cd", "echo", "export", "alias", "history", "type", "exit", "logout"].includes(cmdName)) {
          path = ""; // Built-ins don't have a path
        } else if (commands[cmdName]) {
          path = `/usr/bin/${cmdName}`;
        }
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...(path ? [{ type: "output", value: path }] : []),
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // export command - set environment variable
    if (command === "export") {
      if (args.length === 0) {
        // Show all environment variables
        const envLines = Object.entries(envVars).map(([key, value]) => ({
          type: "output",
          value: `declare -x ${key}="${value}"`
        }));
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...envLines,
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        // Set environment variable (format: export VAR=value)
        const varStr = args.join(" ");
        const match = varStr.match(/^(\w+)=(.*)$/);
        if (match) {
          const [, key, value] = match;
          setEnvVars(prev => ({ ...prev, [key]: value }));
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `bash: export: \`${varStr}': not a valid identifier` },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        }
      }
      return;
    }

    // env command - display environment variables
    if (command === "env") {
      const envLines = Object.entries(envVars).map(([key, value]) => ({
        type: "output",
        value: `${key}=${value}`
      }));
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...envLines,
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // man command - show manual page
    if (command === "man") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "What manual page do you want?" },
        ]);
      } else {
        const cmdName = args[0];
        const manPages = {
          ls: [
            "NAME",
            "    ls - list directory contents",
            "",
            "SYNOPSIS",
            "    ls [OPTION]... [FILE]...",
            "",
            "DESCRIPTION",
            "    List information about the FILEs (the current directory by default).",
            "    Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.",
            "",
            "OPTIONS",
            "    -a, --all          do not ignore entries starting with .",
            "    -l                 use a long listing format",
          ],
          cd: [
            "NAME",
            "    cd - change the working directory",
            "",
            "SYNOPSIS",
            "    cd [dir]",
            "",
            "DESCRIPTION",
            "    Change the current directory to DIR. The default DIR is the value of",
            "    the HOME shell variable.",
          ],
          cat: [
            "NAME",
            "    cat - concatenate files and print on the standard output",
            "",
            "SYNOPSIS",
            "    cat [FILE]...",
            "",
            "DESCRIPTION",
            "    Concatenate FILE(s) to standard output.",
          ],
          help: [
            "NAME",
            "    help - display information about builtin commands",
            "",
            "SYNOPSIS",
            "    help [pattern]",
            "",
            "DESCRIPTION",
            "    Display helpful information about builtin commands.",
          ],
          ifconfig: [
            "NAME",
            "    ifconfig - configure a network interface",
            "",
            "SYNOPSIS",
            "    ifconfig [interface]",
            "",
            "DESCRIPTION",
            "    Ifconfig is used to configure the kernel-resident network interfaces.",
            "    It is used at boot time to set up interfaces as necessary. After that,",
            "    it is usually only needed when debugging or when system tuning is needed.",
          ],
          ip: [
            "NAME",
            "    ip - show / manipulate routing, devices, policy routing and tunnels",
            "",
            "SYNOPSIS",
            "    ip [ OPTIONS ] OBJECT { COMMAND | help }",
            "",
            "DESCRIPTION",
            "    ip is used to show / manipulate routing, network devices, interfaces",
            "    and tunnels.",
            "",
            "OBJECTS",
            "    address - protocol (IP or IPv6) address on a device",
            "    link    - network device",
            "    route   - routing table entry",
          ],
          ping: [
            "NAME",
            "    ping - send ICMP ECHO_REQUEST to network hosts",
            "",
            "SYNOPSIS",
            "    ping [options] destination",
            "",
            "DESCRIPTION",
            "    ping uses the ICMP protocol's mandatory ECHO_REQUEST datagram to",
            "    elicit an ICMP ECHO_RESPONSE from a host or gateway.",
          ],
          pwd: [
            "NAME",
            "    pwd - print name of current/working directory",
            "",
            "SYNOPSIS",
            "    pwd",
            "",
            "DESCRIPTION",
            "    Print the full filename of the current working directory.",
          ],
          mkdir: [
            "NAME",
            "    mkdir - make directories",
            "",
            "SYNOPSIS",
            "    mkdir [OPTION]... DIRECTORY...",
            "",
            "DESCRIPTION",
            "    Create the DIRECTORY(ies), if they do not already exist.",
          ],
          rm: [
            "NAME",
            "    rm - remove files or directories",
            "",
            "SYNOPSIS",
            "    rm [OPTION]... [FILE]...",
            "",
            "DESCRIPTION",
            "    Remove (unlink) the FILE(s).",
            "",
            "OPTIONS",
            "    -r, -R, --recursive    remove directories and their contents recursively",
          ],
          rmdir: [
            "NAME",
            "    rmdir - remove empty directories",
            "",
            "SYNOPSIS",
            "    rmdir [OPTION]... DIRECTORY...",
            "",
            "DESCRIPTION",
            "    Remove the DIRECTORY(ies), if they are empty.",
          ],
          touch: [
            "NAME",
            "    touch - change file timestamps or create empty file",
            "",
            "SYNOPSIS",
            "    touch [OPTION]... FILE...",
            "",
            "DESCRIPTION",
            "    Update the access and modification times of each FILE to the current time.",
            "    A FILE argument that does not exist is created empty.",
          ],
          mv: [
            "NAME",
            "    mv - move (rename) files",
            "",
            "SYNOPSIS",
            "    mv [OPTION]... SOURCE DEST",
            "",
            "DESCRIPTION",
            "    Rename SOURCE to DEST, or move SOURCE(s) to DIRECTORY.",
          ],
          cp: [
            "NAME",
            "    cp - copy files and directories",
            "",
            "SYNOPSIS",
            "    cp [OPTION]... SOURCE DEST",
            "",
            "DESCRIPTION",
            "    Copy SOURCE to DEST, or multiple SOURCE(s) to DIRECTORY.",
            "",
            "OPTIONS",
            "    -r, -R, --recursive    copy directories recursively",
          ],
          grep: [
            "NAME",
            "    grep - print lines that match patterns",
            "",
            "SYNOPSIS",
            "    grep [OPTION...] PATTERNS [FILE...]",
            "",
            "DESCRIPTION",
            "    grep searches for PATTERNS in each FILE. PATTERNS is one or more patterns",
            "    separated by newline characters, and grep prints each line that matches a",
            "    pattern.",
          ],
          find: [
            "NAME",
            "    find - search for files in a directory hierarchy",
            "",
            "SYNOPSIS",
            "    find [-H] [-L] [-P] [-D debugopts] [-Olevel] [starting-point...] [expression]",
            "",
            "DESCRIPTION",
            "    This manual page documents the GNU version of find. GNU find searches the",
            "    directory tree rooted at each given starting-point by evaluating the given",
            "    expression from left to right.",
            "",
            "OPTIONS",
            "    -name pattern    Base of file name matches shell pattern",
          ],
          echo: [
            "NAME",
            "    echo - display a line of text",
            "",
            "SYNOPSIS",
            "    echo [SHORT-OPTION]... [STRING]...",
            "",
            "DESCRIPTION",
            "    Echo the STRING(s) to standard output.",
            "    Supports environment variable expansion using $VAR or ${VAR} syntax.",
          ],
          whoami: [
            "NAME",
            "    whoami - print effective userid",
            "",
            "SYNOPSIS",
            "    whoami",
            "",
            "DESCRIPTION",
            "    Print the user name associated with the current effective user ID.",
          ],
          date: [
            "NAME",
            "    date - print or set the system date and time",
            "",
            "SYNOPSIS",
            "    date [OPTION]... [+FORMAT]",
            "",
            "DESCRIPTION",
            "    Display the current time in the given FORMAT, or set the system date.",
          ],
          clear: [
            "NAME",
            "    clear - clear the terminal screen",
            "",
            "SYNOPSIS",
            "    clear",
            "",
            "DESCRIPTION",
            "    clear clears your terminal screen if possible. It looks in the environment",
            "    for the terminal type and then in the terminfo database to determine how",
            "    to clear the screen.",
          ],
          history: [
            "NAME",
            "    history - GNU History Library",
            "",
            "SYNOPSIS",
            "    history",
            "",
            "DESCRIPTION",
            "    Display the command history list with line numbers. Commands with a",
            "    leading space are not saved in history.",
          ],
          alias: [
            "NAME",
            "    alias - define or display aliases",
            "",
            "SYNOPSIS",
            "    alias [name[=value] ...]",
            "",
            "DESCRIPTION",
            "    Without arguments, alias prints the list of aliases in the form",
            "    alias name=value on standard output.",
            "    Otherwise, an alias is defined for each name whose value is given.",
            "",
            "EXAMPLES",
            "    alias ll='ls -la'",
            "    alias grep='grep --color=auto'",
          ],
          export: [
            "NAME",
            "    export - set export attribute for shell variables",
            "",
            "SYNOPSIS",
            "    export [name[=value] ...]",
            "",
            "DESCRIPTION",
            "    The supplied names are marked for automatic export to the environment of",
            "    subsequently executed commands.",
            "",
            "EXAMPLES",
            "    export PATH=/usr/local/bin:$PATH",
            "    export EDITOR=vim",
          ],
          env: [
            "NAME",
            "    env - run a program in a modified environment",
            "",
            "SYNOPSIS",
            "    env [OPTION]... [NAME=VALUE]... [COMMAND [ARG]...]",
            "",
            "DESCRIPTION",
            "    Set each NAME to VALUE in the environment and run COMMAND.",
            "    Without COMMAND, print the resulting environment.",
          ],
          type: [
            "NAME",
            "    type - describe a command",
            "",
            "SYNOPSIS",
            "    type [name ...]",
            "",
            "DESCRIPTION",
            "    With no options, indicate how each name would be interpreted if used as a",
            "    command name. If the -t option is used, type prints a string which is one",
            "    of alias, keyword, function, builtin, or file if name is an alias, shell",
            "    reserved word, function, builtin, or disk file, respectively.",
          ],
          which: [
            "NAME",
            "    which - locate a command",
            "",
            "SYNOPSIS",
            "    which [options] [--] programname [...]",
            "",
            "DESCRIPTION",
            "    which returns the pathnames of the files (or links) which would be executed",
            "    in the current environment, had its arguments been given as commands.",
          ],
          curl: [
            "NAME",
            "    curl - transfer a URL",
            "",
            "SYNOPSIS",
            "    curl [options...] <url>",
            "",
            "DESCRIPTION",
            "    curl is a tool to transfer data from or to a server, using one of the",
            "    supported protocols (HTTP, HTTPS, FTP, FTPS, etc.).",
            "",
            "EXAMPLES",
            "    curl ifconfig.me      # Get your public IP",
            "    curl ipinfo.io        # Get IP information",
          ],
          wget: [
            "NAME",
            "    wget - download files from the web",
            "",
            "SYNOPSIS",
            "    wget [URL]",
            "    wget [filename]",
            "",
            "DESCRIPTION",
            "    wget is a free utility for non-interactive download of files from the Web.",
            "    In this simulated environment, wget demonstrates download functionality",
            "    for local files like PDFs.",
            "",
            "EXAMPLES",
            "    wget resume.pdf                    # Simulate downloading resume",
            "    wget https://example.com/file.pdf  # Download from URL (simulated)",
            "",
            "NOTES",
            "    For actual file downloads, use 'open' command or 'cat' to view download links.",
          ],
          open: [
            "NAME",
            "    open - open files and applications",
            "",
            "SYNOPSIS",
            "    open <filename>",
            "",
            "DESCRIPTION",
            "    open opens a file using the default application for its type.",
            "    PDF files are opened in a new browser tab.",
            "    Other text files are displayed in the terminal.",
            "",
            "EXAMPLES",
            "    open resume.pdf        # Open resume in new tab",
            "    open about.txt         # Display text file",
            "",
            "FILE TYPES",
            "    PDF files (.pdf)      - Opens in new browser tab",
            "    Text files (.txt)     - Displays content in terminal",
            "    Markdown files (.md)  - Displays content in terminal",
            "",
            "SEE ALSO",
            "    cat(1), less(1), wget(1)",
          ],
          hostname: [
            "NAME",
            "    hostname - show or set the system's host name",
            "",
            "SYNOPSIS",
            "    hostname",
            "",
            "DESCRIPTION",
            "    hostname is used to display the system's DNS name, and to display or set",
            "    its hostname or NIS domain name.",
          ],
          uname: [
            "NAME",
            "    uname - print system information",
            "",
            "SYNOPSIS",
            "    uname [OPTION]...",
            "",
            "DESCRIPTION",
            "    Print certain system information. With no OPTION, same as -s.",
            "",
            "OPTIONS",
            "    -a, --all    print all information",
          ],
          neofetch: [
            "NAME",
            "    neofetch - A command-line system information tool",
            "",
            "SYNOPSIS",
            "    neofetch",
            "",
            "DESCRIPTION",
            "    Neofetch is a command-line system information tool written in bash.",
            "    Neofetch displays information about your operating system, software and",
            "    hardware in an aesthetic and visually pleasing way.",
          ],
          myip: [
            "NAME",
            "    myip - display your public IP and location information",
            "",
            "SYNOPSIS",
            "    myip",
            "",
            "DESCRIPTION",
            "    myip is a custom command that fetches and displays your public IP address,",
            "    geographical location, ISP information, browser, and system details.",
          ],
          less: [
            "NAME",
            "    less - opposite of more",
            "",
            "SYNOPSIS",
            "    less [options] file...",
            "",
            "DESCRIPTION",
            "    Less is a program similar to more, but which allows backward movement",
            "    in the file as well as forward movement.",
          ],
          more: [
            "NAME",
            "    more - file perusal filter for crt viewing",
            "",
            "SYNOPSIS",
            "    more [options] file...",
            "",
            "DESCRIPTION",
            "    more is a filter for paging through text one screenful at a time.",
          ],
          head: [
            "NAME",
            "    head - output the first part of files",
            "",
            "SYNOPSIS",
            "    head [OPTION]... [FILE]...",
            "",
            "DESCRIPTION",
            "    Print the first 10 lines of each FILE to standard output.",
          ],
          tail: [
            "NAME",
            "    tail - output the last part of files",
            "",
            "SYNOPSIS",
            "    tail [OPTION]... [FILE]...",
            "",
            "DESCRIPTION",
            "    Print the last 10 lines of each FILE to standard output.",
          ],
          su: [
            "NAME",
            "    su - run a command with substitute user and group ID",
            "",
            "SYNOPSIS",
            "    su [options] [username]",
            "",
            "DESCRIPTION",
            "    The su command is used to become another user during a login session.",
            "    Invoked without a username, su defaults to becoming the superuser.",
          ],
          sudo: [
            "NAME",
            "    sudo - execute a command as another user",
            "",
            "SYNOPSIS",
            "    sudo [options] [command]",
            "",
            "DESCRIPTION",
            "    sudo allows a permitted user to execute a command as the superuser or",
            "    another user, as specified by the security policy.",
          ],
          ps: [
            "NAME",
            "    ps - report a snapshot of the current processes",
            "",
            "SYNOPSIS",
            "    ps [options]",
            "",
            "DESCRIPTION",
            "    ps displays information about a selection of the active processes.",
          ],
        };
        
        if (manPages[cmdName]) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            ...manPages[cmdName].map(line => ({ type: "output", value: line })),
          ]);
        } else if (commands[cmdName]) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `No manual entry for ${cmdName}` },
            { type: "output", value: `Try 'help ${cmdName}' for brief information.` },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `man: ${cmdName}: command not found` },
          ]);
        }
      }
      return;
    }

    // true command - return success
    if (command === "true") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // false command - return failure (but we can't really show failure in this context)
    if (command === "false") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // test command - evaluate expressions
    if (command === "test" || command === "[") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        // Simple test implementation for strings
        const result = args.join(" ");
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `test: ${result}` },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // unalias command - remove alias
    if (command === "unalias") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "unalias: usage: unalias [-a] name [name ...]" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else if (args[0] === "-a") {
        // Remove all aliases
        setAliases({});
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const name = args[0];
        if (aliases[name]) {
          setAliases(prev => {
            const newAliases = { ...prev };
            delete newAliases[name];
            return newAliases;
          });
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `bash: unalias: ${name}: not found` },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        }
      }
      return;
    }

    // printenv command - display environment variable(s)
    if (command === "printenv") {
      if (args.length === 0) {
        const envLines = Object.entries(envVars).map(([key, value]) => ({
          type: "output",
          value: `${key}=${value}`
        }));
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...envLines,
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const varName = args[0];
        const value = envVars[varName];
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...(value ? [{ type: "output", value }] : []),
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // basename command - get filename from path
    if (command === "basename") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "basename: missing operand" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const path = args[0];
        const parts = path.split("/").filter(p => p);
        const filename = parts[parts.length - 1] || "/";
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: filename },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // dirname command - get directory from path
    if (command === "dirname") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "dirname: missing operand" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const path = args[0];
        const parts = path.split("/").filter(p => p);
        parts.pop(); // Remove last part
        const dirname = parts.length > 0 ? "/" + parts.join("/") : "/";
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: dirname },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // logout command - same as exit
    if (command === "logout") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "logout" },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      setTimeout(() => {
        window.close();
      }, 500);
      return;
    }

    // ifconfig command - display network interfaces
    if (command === "ifconfig") {
      // Fetch real IP if not already loaded
      if (!userIpInfo && !isLoadingIp) {
        setIsLoadingIp(true);
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Fetching network information..." },
        ]);
        
        fetchUserIpInfo().then(ipInfo => {
          setUserIpInfo(ipInfo);
          setIsLoadingIp(false);
          
          const publicIp = ipInfo?.ip || "Unknown";
          const interfaces = [
            "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
            `        inet ${publicIp}  netmask 255.255.255.0  broadcast ${publicIp.split('.').slice(0,3).join('.')}.255`,
            "        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>",
            "        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)",
            "        RX packets 2547893  bytes 3043058123 (3.0 GB)",
            "        RX errors 0  dropped 0  overruns 0  frame 0",
            "        TX packets 1839291  bytes 234567890 (234.5 MB)",
            "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0",
            "",
            "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536",
            "        inet 127.0.0.1  netmask 255.0.0.0",
            "        inet6 ::1  prefixlen 128  scopeid 0x10<host>",
            "        loop  txqueuelen 1000  (Local Loopback)",
            "        RX packets 184376  bytes 29847562 (29.8 MB)",
            "        RX errors 0  dropped 0  overruns 0  frame 0",
            "        TX packets 184376  bytes 29847562 (29.8 MB)",
            "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0",
          ];
          
          // Update history with actual data
          setHistory((h) => {
            const newHistory = [...h];
            newHistory.pop(); // Remove "Fetching..." message
            return [
              ...newHistory,
              ...interfaces.map(line => ({ type: "output", value: line })),
            ];
          });
        });
        return;
      }
      
      // Use cached IP info
      const publicIp = userIpInfo?.ip || "192.168.1.100";
      const interfaces = [
        "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
        `        inet ${publicIp}  netmask 255.255.255.0  broadcast ${publicIp.split('.').slice(0,3).join('.')}.255`,
        "        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>",
        "        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)",
        "        RX packets 2547893  bytes 3043058123 (3.0 GB)",
        "        RX errors 0  dropped 0  overruns 0  frame 0",
        "        TX packets 1839291  bytes 234567890 (234.5 MB)",
        "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0",
        "",
        "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536",
        "        inet 127.0.0.1  netmask 255.0.0.0",
        "        inet6 ::1  prefixlen 128  scopeid 0x10<host>",
        "        loop  txqueuelen 1000  (Local Loopback)",
        "        RX packets 184376  bytes 29847562 (29.8 MB)",
        "        RX errors 0  dropped 0  overruns 0  frame 0",
        "        TX packets 184376  bytes 29847562 (29.8 MB)",
        "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0",
      ];
      
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...interfaces.map(line => ({ type: "output", value: line })),
      ]);
      return;
    }

    // ip command - show/manipulate routing, devices
    if (command === "ip") {
      const subcommand = args[0] || "help";
      
      if (subcommand === "addr" || subcommand === "a") {
        const ipOutput = [
          "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000",
          "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00",
          "    inet 127.0.0.1/8 scope host lo",
          "       valid_lft forever preferred_lft forever",
          "    inet6 ::1/128 scope host",
          "       valid_lft forever preferred_lft forever",
          "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000",
          "    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff",
          "    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0",
          "       valid_lft 86395sec preferred_lft 86395sec",
          "    inet6 fe80::a00:27ff:fe4e:66a1/64 scope link",
          "       valid_lft forever preferred_lft forever",
        ];
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...ipOutput.map(line => ({ type: "output", value: line })),
        ]);
      } else if (subcommand === "route" || subcommand === "r") {
        const routeOutput = [
          "default via 192.168.1.1 dev eth0 proto dhcp metric 100",
          "192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100",
        ];
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...routeOutput.map(line => ({ type: "output", value: line })),
        ]);
      } else if (subcommand === "link" || subcommand === "l") {
        const linkOutput = [
          "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000",
          "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00",
          "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000",
          "    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff",
        ];
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...linkOutput.map(line => ({ type: "output", value: line })),
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }" },
          { type: "output", value: "       ip [ -force ] -batch filename" },
          { type: "output", value: "where  OBJECT := { link | address | route }" },
          { type: "output", value: "       OPTIONS := { -s[tatistics] | -d[etails] | -r[esolve] }" },
        ]);
      }
      return;
    }

    // hostname command - show system hostname
    if (command === "hostname") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: "portfolio" },
        { type: "output", value: "" },
        { type: "output", value: "" },
      ]);
      return;
    }

    // ping command - test network connectivity
    if (command === "ping") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "ping: usage error: Destination address required" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const host = args[0];
        const pingOutput = [
          `PING ${host} (93.184.216.34) 56(84) bytes of data.`,
          `64 bytes from ${host} (93.184.216.34): icmp_seq=1 ttl=56 time=11.2 ms`,
          `64 bytes from ${host} (93.184.216.34): icmp_seq=2 ttl=56 time=10.8 ms`,
          `64 bytes from ${host} (93.184.216.34): icmp_seq=3 ttl=56 time=11.5 ms`,
          `64 bytes from ${host} (93.184.216.34): icmp_seq=4 ttl=56 time=10.9 ms`,
          `^C`,
          `--- ${host} ping statistics ---`,
          `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`,
          `rtt min/avg/max/mdev = 10.823/11.100/11.534/0.268 ms`,
        ];
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...pingOutput.map(line => ({ type: "output", value: line })),
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // curl command - fetch data from URL
    if (command === "curl") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "curl: try 'curl --help' for more information" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const url = args[0];
        // Handle common IP check URLs
        if (url.includes("ifconfig.me") || url.includes("ipinfo.io") || url.includes("icanhazip.com")) {
          if (!userIpInfo && !isLoadingIp) {
            setIsLoadingIp(true);
            setHistory((h) => [
              ...h,
              { type: "input", value: cmd },
              { type: "output", value: "Fetching..." },
            ]);
            
            fetchUserIpInfo().then(ipInfo => {
              setUserIpInfo(ipInfo);
              setIsLoadingIp(false);
              
              setHistory((h) => {
                const newHistory = [...h];
                newHistory.pop(); // Remove "Fetching..." message
                return [
                  ...newHistory,
                  { type: "output", value: ipInfo?.ip || "Unable to fetch IP" },
                  { type: "output", value: "" },
                  { type: "output", value: "" },
                ];
              });
            });
          } else {
            setHistory((h) => [
              ...h,
              { type: "input", value: cmd },
              { type: "output", value: userIpInfo?.ip || "Loading..." },
              { type: "output", value: "" },
              { type: "output", value: "" },
            ]);
          }
        } else {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `curl: (6) Could not resolve host: ${url}` },
            { type: "output", value: "" },
            { type: "output", value: "" },
          ]);
        }
      }
      return;
    }

    // wget command - download from URL
    if (command === "wget") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "wget: missing URL" },
          { type: "output", value: "Usage: wget [URL] or wget [filename]" },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      } else {
        const target = args[0];
        
        // Check if it's a PDF file in the current directory
        if (target.endsWith('.pdf')) {
          const currentDir = getDirectoryContents(currentPath, fileSystemState);
          if (currentDir && currentDir[target] && currentDir[target].isPdf) {
            setHistory((h) => [
              ...h,
              { type: "input", value: cmd },
              { type: "output", value: `--${new Date().toISOString().split('T')[0]} ${new Date().toTimeString().split(' ')[0]}--  ${target}` },
              { type: "output", value: "Resolving host..." },
              { type: "output", value: "Connecting to server..." },
              { type: "output", value: "" },
              { type: "output", value: "📥 PDF download simulated! In a real system, this would download the file." },
              { type: "output", value: "" },
              { type: "output", value: "To view the actual resume, use:" },
              { type: "output", value: "  $ cat resume.pdf    # View download link" },
              { type: "output", value: "  $ open resume.pdf   # Open in new tab" },
              { type: "output", value: "" },
              { type: "output", value: "" },
            ]);
            return;
          }
        }
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: `--${new Date().toISOString().split('T')[0]} ${new Date().toTimeString().split(' ')[0]}--  ${args[0]}` },
          { type: "output", value: "Resolving host..." },
          { type: "output", value: "This is a simulated terminal environment. File download is not available." },
          { type: "output", value: "" },
          { type: "output", value: "" },
        ]);
      }
      return;
    }

    // open command - open files (especially PDFs)
    if (command === "open") {
      if (args.length === 0) {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "open: missing file operand" },
          { type: "output", value: "Usage: open [filename]" },
        ]);
        return;
      }

      const filename = args[0];
      const currentDir = getDirectoryContents(currentPath, fileSystemState);
      
      if (currentDir && currentDir[filename]) {
        const file = currentDir[filename];
        
        // Check permissions
        if (!hasPermission(file, isRoot)) {
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `open: ${filename}: Permission denied` },
          ]);
          return;
        }
        
        // Handle PDF files
        if (file.isPdf || filename.endsWith('.pdf')) {
          // Open PDF in new tab - replace with your actual resume URL
          const resumeUrl = "https://drive.google.com/file/d/1227peCwvlelYkIhEq74uwuLhvr1TN9oj/view?usp=sharing";
          window.open(resumeUrl, '_blank');
          
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            { type: "output", value: `📄 Opening ${filename} in new tab...` },
            { type: "output", value: "" },
            { type: "output", value: "✓ Resume opened successfully!" },
            { type: "output", value: "" },
            // { type: "output", value: "💡 Tip: Update the resume URL in the code with your actual Google Drive" },
            // { type: "output", value: "   or Dropbox link to share your real resume." },
          ]);
          return;
        }
        
        // For other files, just display them like cat
        const contentKey = file.content;
        if (fileContents[contentKey] || fileContents[filename]) {
          const content = fileContents[contentKey] || fileContents[filename];
          setHistory((h) => [
            ...h,
            { type: "input", value: cmd },
            ...content,
          ]);
          return;
        }
      }
      
      // File not found
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: `open: ${filename}: No such file or directory` },
      ]);
      return;
    }

    // myip command - show user's public IP and location
    if (command === "myip") {
      if (!userIpInfo && !isLoadingIp) {
        setIsLoadingIp(true);
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Fetching your IP information..." },
        ]);
        
        fetchUserIpInfo().then(ipInfo => {
          setUserIpInfo(ipInfo);
          setIsLoadingIp(false);
          
          const browserInfo = getBrowserInfo();
          const output = [];
          
          if (ipInfo) {
            output.push({ type: "output", value: "╔═══════════════════════════════════════════╗" });
            output.push({ type: "output", value: "║         YOUR IP INFORMATION               ║" });
            output.push({ type: "output", value: "╠═══════════════════════════════════════════╣" });
            output.push({ type: "output", value: `║ Public IP:    ${(ipInfo.ip || 'Unknown').padEnd(28)}║` });
            if (ipInfo.city) output.push({ type: "output", value: `║ Location:     ${(ipInfo.city + ", " + ipInfo.country).padEnd(28)}║` });
            if (ipInfo.region) output.push({ type: "output", value: `║ Region:       ${(ipInfo.region).padEnd(28)}║` });
            if (ipInfo.timezone) output.push({ type: "output", value: `║ Timezone:     ${(ipInfo.timezone).padEnd(28)}║` });
            if (ipInfo.isp) output.push({ type: "output", value: `║ ISP:          ${(ipInfo.isp).substring(0, 28).padEnd(28)}║` });
            output.push({ type: "output", value: "╠═══════════════════════════════════════════╣" });
            output.push({ type: "output", value: `║ Browser:      ${(browserInfo.browser).padEnd(28)}║` });
            output.push({ type: "output", value: `║ OS:           ${(browserInfo.os).padEnd(28)}║` });
            output.push({ type: "output", value: `║ Screen:       ${(`${window.screen.width}x${window.screen.height}`).padEnd(28)}║` });
            output.push({ type: "output", value: `║ Language:     ${(navigator.language).padEnd(28)}║` });
            output.push({ type: "output", value: "╚═══════════════════════════════════════════╝" });
          } else {
            output.push({ type: "output", value: "Unable to fetch IP information." });
          }
          
          setHistory((h) => {
            const newHistory = [...h];
            newHistory.pop(); // Remove "Fetching..." message
            return [
              ...newHistory,
              ...output,
            ];
          });
        });
        return;
      }
      
      // Use cached IP info
      if (userIpInfo) {
        const browserInfo = getBrowserInfo();
        const output = [
          { type: "output", value: "╔═══════════════════════════════════════════╗" },
          { type: "output", value: "║         YOUR IP INFORMATION               ║" },
          { type: "output", value: "╠═══════════════════════════════════════════╣" },
          { type: "output", value: `║ Public IP:    ${(userIpInfo.ip || 'Unknown').padEnd(28)}║` },
        ];
        
        if (userIpInfo.city) output.push({ type: "output", value: `║ Location:     ${(userIpInfo.city + ", " + userIpInfo.country).padEnd(28)}║` });
        if (userIpInfo.region) output.push({ type: "output", value: `║ Region:       ${(userIpInfo.region).padEnd(28)}║` });
        if (userIpInfo.timezone) output.push({ type: "output", value: `║ Timezone:     ${(userIpInfo.timezone).padEnd(28)}║` });
        if (userIpInfo.isp) output.push({ type: "output", value: `║ ISP:          ${(userIpInfo.isp).substring(0, 28).padEnd(28)}║` });
        
        output.push(
          { type: "output", value: "╠═══════════════════════════════════════════╣" },
          { type: "output", value: `║ Browser:      ${(browserInfo.browser).padEnd(28)}║` },
          { type: "output", value: `║ OS:           ${(browserInfo.os).padEnd(28)}║` },
          { type: "output", value: `║ Screen:       ${(`${window.screen.width}x${window.screen.height}`).padEnd(28)}║` },
          { type: "output", value: `║ Language:     ${(navigator.language).padEnd(28)}║` },
          { type: "output", value: "╚═══════════════════════════════════════════╝" }
        );
        
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          ...output,
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", value: cmd },
          { type: "output", value: "Loading IP information..." },
        ]);
      }
      return;
    }

    if (command === "whoami") {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: isRoot ? "root" : currentUser || "guest" },
      ]);
      return;
    }

    if (commands[command]) {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...(terminalData[commands[command]] || []),
      ]);
    } else {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        { type: "output", value: `bash: ${command}: command not found` },
        { type: "output", value: `Type 'help' to see available commands.` },
      ]);
    }
  };

  function renderInputLine() {
    const before = input.slice(0, caretPos);
    const after = input.slice(caretPos);
    return (
      <>
        {before}
        <span className={`terminal-cursor${isInputFocused ? " blink" : ""}`}>█</span>
        {after}
      </>
    );
  }

  // Boot screen
  if (isBooting) {
  return (
      <div className="boot-container">
        <div className="boot-screen">
          <div className="boot-ascii">
            <pre>{`
 ███╗   ██╗██╗██╗ ██   ███████╗    ██████    ██████╗ ████████╗███████╗ ██████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ████╗  ██║██║██║ ██   ██╔════╝    ██   ██  ██╔═══██╗╚══██╔══╝██╔════╝██╔═══██╗██╔══██╗██║     ██║██╔═══██╗
 ██╔██╗ ██║██║██║      ███████╗    ██████   ██║   ██║   ██║   █████╗  ██║   ██║██████╔╝██║     ██║██║   ██║
 ██║╚██╗██║██║██║      ╚════██║    ██╗      ██╗   ██║   ██║   ██╔══╝  ██║   ██║██╔══██╗██║     ██║██║   ██║
 ██║ ╚████║██║██║      ███████║    ██╗       ██████╔╝   ██║   ██║     ╚██████╔╝██║  ██║███████╗██║╚██████╔╝
 ╚═╝  ╚═══╝╚═╝╚═╝      ╚═════╝     ██╗       ╚═════╝    ╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═════╝╚═╝ ╚═════╝ 
            `}</pre>
          </div>
          <div className="boot-messages" ref={bootMessagesRef}>
            {bootMessages.map((msg, idx) => (
              <div key={idx} className="boot-message">{msg}</div>
            ))}
            {isBooting && <span className="boot-cursor">█</span>}
            <div className="boot-messages-end" />
          </div>
          <div className="boot-progress">
            <div className="boot-progress-bar">
              <div 
                className="boot-progress-fill" 
                style={{ width: `${bootProgress}%` }}
              ></div>
            </div>
            <div className="boot-progress-text">Booting... {Math.round(bootProgress)}%</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-container">
      <div className="terminal-window">
      <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
      </div>
          <div className="terminal-title">{getPrompt(currentPath, currentUser, isAuthenticated, isRoot)}</div>
          <div className="terminal-header-spacer"></div>
        </div>
        <div className="terminal-body" ref={terminalEndRef}>
        {history.map((item, idx) =>
          item.type === "input" ? (
              <div key={idx} className="terminal-line terminal-command-line">
                <span className="terminal-prompt">{getPrompt(currentPath, currentUser, isAuthenticated, isRoot)}</span>
                <span className="terminal-input">{item.value}</span>
            </div>
          ) : (
              <div key={idx} className={`terminal-line${!item.value ? " blank-line" : ""}`}>
              {renderOutputLine(item)}
            </div>
          )
        )}
          <div 
            className="terminal-line terminal-input-line"
            onClick={(e) => {
              // Make the entire line clickable to focus input
              if (!isMobile && inputLineRef.current && e.target === e.currentTarget) {
                inputLineRef.current.focus();
                setIsInputFocused(true);
                setCaretPos(input.length);
                scrollToBottom();
              }
            }}
          >
            <span className="terminal-prompt">{getPrompt(currentPath, currentUser, isAuthenticated, isRoot)}</span>
          {isMobile ? (
            <input
              ref={inputLineRef}
              type="text"
              className="terminal-mobile-input"
              value={input}
                onChange={(e) => {
                setInput(e.target.value);
                setCaretPos(e.target.value.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (input.trim() !== "") {
                    handleCommand(input);
                      setCommandHistory(prev => [...prev, input]);
                    setInput("");
                    setCaretPos(0);
                    setHistoryIndex(null);
                  }
                }
              }}
              autoFocus
              spellCheck={false}
              aria-label="Terminal input"
            />
          ) : (
            <div
              className="terminal-fake-input"
              tabIndex={0}
              ref={inputLineRef}
              onFocus={() => {
                setIsInputFocused(true);
                scrollToBottom();
              }}
              onBlur={() => setIsInputFocused(false)}
                onKeyDown={handleKeyDown}
                onClick={(e) => {
                  e.stopPropagation();
                setIsInputFocused(true);
                setCaretPos(input.length);
                scrollToBottom();
              }}
              spellCheck={false}
              aria-label="Terminal input"
            >
              {renderInputLine()}
            </div>
          )}
          </div>
        <div ref={terminalEndRef} />
      </div>
          </div>
    </div>
  );
}

export default App;
