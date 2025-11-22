"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CTFGameProps {
  onGameEnd: (attempts: number, duration: number, baseScore: number) => void;
}

interface FileSystemNode {
  type: 'file' | 'directory';
  name: string;
  content?: string; // For files
  children?: { [key: string]: FileSystemNode }; // For directories
  parent?: FileSystemNode | null;
}

interface TerminalLine {
  type: 'output' | 'input' | 'error' | 'success' | 'info' | 'system';
  content: string;
}

const CTFGame: React.FC<CTFGameProps> = ({ onGameEnd }) => {
  // --- State ---
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string>('/home/guest');
  const [fileSystem, setFileSystem] = useState<FileSystemNode | null>(null);
  const [currentNode, setCurrentNode] = useState<FileSystemNode | null>(null);
  
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Initialization ---
  useEffect(() => {
    initializeFileSystem();
    runBootSequence();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, bootSequence]);

  // --- File System Setup ---
  const initializeFileSystem = () => {
    const root: FileSystemNode = {
      type: 'directory',
      name: '',
      children: {
        'home': {
          type: 'directory',
          name: 'home',
          children: {
            'guest': {
              type: 'directory',
              name: 'guest',
              children: {
                'readme.txt': { type: 'file', name: 'readme.txt', content: 'WELCOME TO REXTRO CORP SERVER.\n\nYour mission is to retrieve the launch codes for the Silver Jubilee project.\nThey are located in the /var/secure/launch_codes.txt file.\n\nWARNING: Access to /var/secure is restricted to authorized personnel only.' },
                'notes.md': { type: 'file', name: 'notes.md', content: 'To Do:\n- Update firewall rules\n- Change password for "admin" user (Hint: It was encoded in the system.log)\n- Delete temp files' },
              }
            }
          }
        },
        'var': {
          type: 'directory',
          name: 'var',
          children: {
            'log': {
              type: 'directory',
              name: 'log',
              children: {
                'system.log': { type: 'file', name: 'system.log', content: '[INFO] System Boot... OK\n[WARN] Failed login attempt from 192.168.1.5\n[INFO] Password rotation: Admin password encoded as Base64: "U2lsdmVySnViaWxlZTIwMjU="\n[INFO] Service started.' },
                'auth.log': { type: 'file', name: 'auth.log', content: 'Sep 22 10:00:01 server sshd[123]: Accepted password for user guest' }
              }
            },
            'secure': {
              type: 'directory',
              name: 'secure',
              children: {
                'launch_codes.txt': { type: 'file', name: 'launch_codes.txt', content: 'REXTRO-25-YEARS-OF-EXCELLENCE\n\nCongratulations! You have captured the flag.' }
              }
            }
          }
        },
        'etc': {
          type: 'directory',
          name: 'etc',
          children: {
            'passwd': { type: 'file', name: 'passwd', content: 'root:x:0:0:root:/root:/bin/bash\nguest:x:1000:1000:guest:/home/guest:/bin/bash' },
            'motd': { type: 'file', name: 'motd', content: 'Rextro Corp Internal Server - Authorized Use Only' }
          }
        }
      }
    };

    // Link parents
    const linkParents = (node: FileSystemNode, parent: FileSystemNode | null) => {
      node.parent = parent;
      if (node.children) {
        Object.values(node.children).forEach(child => linkParents(child, node));
      }
    };
    linkParents(root, null);

    setFileSystem(root);
    // Set start node to /home/guest
    if (root.children?.['home']?.children?.['guest']) {
      setCurrentNode(root.children['home'].children['guest']);
    }
  };

  // --- Boot Sequence ---
  const runBootSequence = () => {
    const bootLines = [
      'BIOS Date 09/22/25 15:23:45 Ver: 1.0.2',
      'CPU: Rextro Quantum Core i9 @ 5.0GHz',
      'Memory Test: 65536K OK',
      'Detecting Primary Master ... REXTRO-SSD-1TB',
      'Booting from Primary Master...',
      'Loading Kernel...',
      'Mounting File Systems... [OK]',
      'Starting Network Service... [OK]',
      'Starting SSH Daemon... [OK]',
      'Initializing Secure Shell...',
      '----------------------------------------',
      'REXTRO CORP SECURE TERMINAL ACCESS',
      '----------------------------------------',
    ];

    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        addToHistory('system', line);
        if (index === bootLines.length - 1) {
          setBootSequence(false);
          addToHistory('info', 'Type "help" for available commands.');
        }
      }, delay);
    });
  };

  // --- Helper Functions ---
  const addToHistory = (type: TerminalLine['type'], content: string) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const resolvePath = (path: string): FileSystemNode | null => {
    if (!fileSystem || !currentNode) return null;

    let startNode = path.startsWith('/') ? fileSystem : currentNode;
    const parts = path.split('/').filter(p => p && p !== '.');

    for (const part of parts) {
      if (part === '..') {
        if (startNode.parent) startNode = startNode.parent;
      } else if (startNode.children && startNode.children[part]) {
        startNode = startNode.children[part];
      } else {
        return null;
      }
    }
    return startNode;
  };

  // --- Command Handlers ---
  const handleCommand = (cmdStr: string) => {
    if (bootSequence) return;
    
    const trimmedCmd = cmdStr.trim();
    if (!trimmedCmd) return;

    addToHistory('input', `guest@rextro:${currentPath}$ ${trimmedCmd}`);
    setInput('');
    setAttempts(prev => prev + 1);

    const [cmd, ...args] = trimmedCmd.split(' ');
    const arg = args.join(' ');

    switch (cmd) {
      case 'help':
        addToHistory('output', 'Available commands:');
        addToHistory('output', '  ls [path]     - List directory contents');
        addToHistory('output', '  cd [path]     - Change directory');
        addToHistory('output', '  cat [file]    - Display file contents');
        addToHistory('output', '  pwd           - Print working directory');
        addToHistory('output', '  clear         - Clear terminal screen');
        addToHistory('output', '  whoami        - Display current user');
        addToHistory('output', '  decode [str]  - Decode Base64 string');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        addToHistory('output', 'guest');
        break;

      case 'pwd':
        addToHistory('output', currentPath);
        break;

      case 'ls':
        const targetNodeLs = arg ? resolvePath(arg) : currentNode;
        if (!targetNodeLs) {
          addToHistory('error', `ls: cannot access '${arg}': No such file or directory`);
        } else if (targetNodeLs.type === 'file') {
          addToHistory('output', targetNodeLs.name);
        } else {
          // Check permissions for /var/secure
          if (targetNodeLs.name === 'secure' && targetNodeLs.parent?.name === 'var') {
             // Allow listing if we are in /var/secure (which implies we passed the check in cd)
             // OR if we are just listing it from outside? Let's restrict listing too unless we are root or have password.
             // For simplicity, let's say 'ls' shows it exists, but 'cd' or 'cat' checks permission.
             // Actually, let's hide contents of secure unless we are inside it.
             if (currentNode !== targetNodeLs) {
                 addToHistory('error', `ls: cannot open directory '${targetNodeLs.name}': Permission denied`);
                 return;
             }
          }
          
          const contents = targetNodeLs.children ? Object.keys(targetNodeLs.children).join('  ') : '';
          addToHistory('output', contents);
        }
        break;

      case 'cd':
        if (!arg) {
          // Go home
          const home = resolvePath('/home/guest');
          if (home) {
            setCurrentNode(home);
            setCurrentPath('/home/guest');
          }
          return;
        }
        
        const targetNodeCd = resolvePath(arg);
        if (!targetNodeCd) {
          addToHistory('error', `cd: ${arg}: No such file or directory`);
        } else if (targetNodeCd.type !== 'directory') {
          addToHistory('error', `cd: ${arg}: Not a directory`);
        } else {
          // Security Check for /var/secure
          if (targetNodeCd.name === 'secure' && targetNodeCd.parent?.name === 'var') {
             addToHistory('info', 'Access to /var/secure requires authentication.');
             addToHistory('input', 'Password required:');
             // We need a way to capture password input. 
             // For this simple version, let's make them use a specific command or just 'login' logic?
             // Better: prompt for password in a modal or just fail and say "Use 'sudo' or find the password"
             // Let's make them use a command `auth <password>` to unlock it?
             // Or simpler: if they type `cd /var/secure`, we check if they provided a password flag? No that's not standard.
             // Let's implement a simple state lock.
             addToHistory('error', '-bash: cd: /var/secure: Permission denied');
             return;
          }
          
          setCurrentNode(targetNodeCd);
          // Reconstruct path string (simplified)
          // In a real FS we'd traverse up, but here we can just use the arg if it's absolute, or append.
          // Let's just traverse up from targetNodeCd to root to build path.
          let p = '';
          let temp = targetNodeCd;
          while (temp.parent) {
            p = '/' + temp.name + p;
            temp = temp.parent;
          }
          setCurrentPath(p || '/');
        }
        break;

      case 'cat':
        if (!arg) {
          addToHistory('error', 'cat: missing operand');
          return;
        }
        const targetNodeCat = resolvePath(arg);
        if (!targetNodeCat) {
          addToHistory('error', `cat: ${arg}: No such file or directory`);
        } else if (targetNodeCat.type === 'directory') {
          addToHistory('error', `cat: ${arg}: Is a directory`);
        } else {
           // Check if it's the flag
           if (targetNodeCat.name === 'launch_codes.txt') {
             addToHistory('success', targetNodeCat.content || '');
             completeGame();
           } else {
             addToHistory('output', targetNodeCat.content || '');
           }
        }
        break;

      case 'decode':
        if (!arg) {
          addToHistory('error', 'usage: decode <string>');
          return;
        }
        try {
          const decoded = atob(arg);
          addToHistory('success', `Decoded output: ${decoded}`);
        } catch (e) {
          addToHistory('error', 'Invalid Base64 string');
        }
        break;
        
      case 'sudo':
        // Allow sudo cd /var/secure with password
        if (arg.startsWith('cd /var/secure') || arg.startsWith('cd var/secure')) {
             // In a real terminal, sudo prompts for password.
             // Here we can simulate it or just check if they know the password command.
             // Let's make a custom command `login` or just `sudo -S`?
             // Let's keep it simple: They need to find the password "SilverJubilee2025"
             // and maybe run `sudo_login <password>`?
             // Or just `auth <password>`
             addToHistory('info', 'usage: sudo <command>');
        } else {
             addToHistory('error', 'sudo: command not found or restricted');
        }
        break;
        
      case 'auth':
        if (arg === 'SilverJubilee2025') {
           addToHistory('success', 'Authentication Successful. Root privileges granted.');
           // Unlock secure folder access
           // For this implementation, let's just move them there
           const secure = resolvePath('/var/secure');
           if (secure) {
             setCurrentNode(secure);
             setCurrentPath('/var/secure');
             addToHistory('info', 'Directory changed to /var/secure');
           }
        } else {
           addToHistory('error', 'Authentication Failed.');
        }
        break;

      default:
        addToHistory('error', `${cmd}: command not found`);
    }
  };

  const completeGame = () => {
    if (isComplete) return;
    setIsComplete(true);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const baseScore = 2000;
    
    setTimeout(() => {
      addToHistory('system', '----------------------------------------');
      addToHistory('system', 'CRITICAL DATA RETRIEVED');
      addToHistory('system', 'MISSION ACCOMPLISHED');
      addToHistory('system', '----------------------------------------');
      
      setTimeout(() => {
        onGameEnd(attempts, duration, baseScore);
      }, 3000);
    }, 1000);
  };

  return (
    <div 
      className="flex flex-col h-full bg-[#0c0c0c] font-mono text-sm md:text-base p-6 rounded-xl border border-green-500/20 shadow-[0_0_50px_rgba(0,255,0,0.05)] relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT Screen Effects */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,255,0,0.05),transparent_80%)] z-0" />

      {/* Terminal Header */}
      <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2 text-green-500/50 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <span>guest@rextro-server:~</span>
      </div>

      {/* Output Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent relative z-20"
      >
        {history.map((line, i) => (
          <div key={i} className={`${
            line.type === 'input' ? 'text-white' :
            line.type === 'error' ? 'text-red-400' :
            line.type === 'success' ? 'text-green-400 font-bold' :
            line.type === 'info' ? 'text-cyan-400' :
            line.type === 'system' ? 'text-yellow-500/80' :
            'text-green-500'
          }`}>
            {line.content}
          </div>
        ))}
        {isComplete && (
          <div className="text-green-400 animate-pulse mt-4">
            [CONNECTION TERMINATED]
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center text-green-500 relative z-20">
        <span className="mr-2 whitespace-nowrap">guest@rextro:{currentPath}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-green-900/50"
          disabled={isComplete || bootSequence}
          autoComplete="off"
          autoFocus
        />
        <div className={`w-2 h-4 bg-green-500 ml-1 ${!bootSequence && !isComplete ? 'animate-pulse' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default CTFGame;
