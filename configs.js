const bancos = [
  'mongodb',
  'sql',
  'nosql',
  'mariadb'
]

const linguagens = [
  'javascript',
  // 'js',
  'typescript',
  // 'ts',
  'python',
  'html5',
  'css3',
  'kotlin',
  'java',
  // 'bash',
  // 'php',
  // 'css',
  // 'html'
  
]

const bibliotecas = [
  'vue',
  'reactnative',
  'reactjs',
  // 'flutter',
]

const frameworks = [
  'angular',
  'djangoproject',
]

const variados = [
  'bolhadev',
  'git',
  'github',
  'stackoverflow',
  'node',
  'sseraphini',
  'linux',
  'deno',
  'ubuntu',
  'mint',
  'debian',
  'fedora',
  'docker',
  'gitpod',
  'frontend',
  'backend',
  'vscode',
  'webmaster',
  'fullstack'
]

exports.keywords = [].concat(
  linguagens,
  bancos,
  bibliotecas,
  frameworks,
  variados
).map(v => v.trim())
