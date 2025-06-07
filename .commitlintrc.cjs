// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
const fs = require("fs");
const path = require("path");


const scopes = fs
  .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name.replace(/s$/, ""));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', 100],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', 100],
		'header-max-length': [2, 'always', 100],
    // @see: https://commitlint.js.org/#/reference-rules
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ]
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: "选择你要提交的类型 | Select the type of change that you're committing:",
      scope: '选择一个提交范围（可选）| Denote the SCOPE of this change (optional):',
      customScope: '请输入自定义的提交范围 | Denote the SCOPE of this change:',
      subject: '填写简短精炼的变更描述 | Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 | Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking:
        '列举非兼容性重大的变更（可选）。使用 "|" 换行 | List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixesSelect:
        '选择关联issue前缀（可选）| Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefix: '输入自定义issue前缀 | Input ISSUES prefix:',
      footer: '列举关联issue (可选) 例如: #31, #I3244 | List any ISSUES by this change. E.g.: #31, #34:\n',
      confirmCommit: '是否提交或修改commit ? | Are you sure you want to proceed with the commit above?'
    },
    types: [
      { value: 'feat', name: 'feat:     🚀  新增功能 | A new feature', emoji: "🚀" },
      { value: 'fix', name: 'fix:      🧩  修复缺陷 | A bug fix', emoji: "🧩"  },
      { value: 'docs', name: 'docs:     📚  文档更新 | Documentation only changes', emoji: "📚" },
      { value: 'style', name: 'style:    🎨  代码格式 | Changes that do not affect the meaning of the code', emoji: "🎨"  },
      { value: 'refactor', name: 'refactor: ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature', emoji: "♻️"  },
      { value: 'perf', name: 'perf:     ⚡️  性能提升 | A code change that improves performance', emoji: "⚡️"  },
      { value: 'test', name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests', emoji: "✅"  },
      { value: 'build', name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies', emoji: "📦️"  },
      { value: 'ci', name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts', emoji: "🎡"  },
      { value: 'revert', name: 'revert:   ⏪️  回退代码 | Revert to a commit', emoji: "⏪️"  },
      { value: 'chore', name: 'chore:    🔨  其他修改 | Other changes that do not modify src or test files', emoji: "🔨" }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [...scopes],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
};
