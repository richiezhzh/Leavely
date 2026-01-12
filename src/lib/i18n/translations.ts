export type Language = 'zh' | 'en';

export interface Translations {
  // Common
  appName: string;
  home: string;
  leavePlan: string;
  teamStats: string;
  submit: string;
  cancel: string;
  delete: string;
  deleting: string;
  clear: string;
  search: string;
  loading: string;
  submitting: string;
  days: string;
  
  // Navigation
  nav: {
    home: string;
    leavePlan: string;
    teamStats: string;
  };
  
  // Home page
  homePage: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaSubmit: string;
    ctaView: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    howToUse: string;
    howToUseSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    footer: string;
  };
  
  // Submit page
  submitPage: {
    title: string;
    subtitle: string;
    personalInfo: string;
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    selectDate: string;
    selectStartDate: string;
    selectEndDate: string;
    remarkTitle: string;
    remarkOptional: string;
    remarkPlaceholder: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
    errorName: string;
    errorContact: string;
    errorStartDate: string;
    errorEndDate: string;
    errorSubmit: string;
  };
  
  // Dashboard page
  dashboardPage: {
    title: string;
    subtitle: string;
    calendarView: string;
    listView: string;
    totalLeaves: string;
    teamMembers: string;
    totalDays: string;
    onLeaveToday: string;
    selectDateToView: string;
    clickToViewDetails: string;
    noLeaveOnDay: string;
    searchPlaceholder: string;
    noMatchingRecords: string;
    noLeaveRecords: string;
    tryOtherKeywords: string;
    recordsWillShow: string;
  };
  
  // Calendar
  calendar: {
    weekDays: string[];
    startDate: string;
    endDate: string;
    notSelected: string;
    selectedRange: string;
    holiday: string;
    workday: string;
    selectedRange2: string;
    onePerson: string;
    twoPeople: string;
    threeOrMore: string;
  };
  
  // Holidays
  holidays: {
    newYear: string;
    springFestival: string;
    qingming: string;
    laborDay: string;
    dragonBoat: string;
    midAutumn: string;
    nationalDay: string;
    workdayMakeup: string;
  };
  
  // Leave card
  leaveCard: {
    remark: string;
    confirmDelete: string;
  };
  
  // Calendar integration
  calendarIntegration: {
    addToCalendar: string;
    downloadICS: string;
    addToOutlook: string;
    addToGoogle: string;
    subscribeCalendar: string;
    subscribeDesc: string;
    copyLink: string;
    copied: string;
    exportAll: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    appName: 'Leavely',
    home: '首页',
    leavePlan: '休假计划',
    teamStats: '团队统计',
    submit: '提交',
    cancel: '取消',
    delete: '删除',
    deleting: '删除中...',
    clear: '清除',
    search: '搜索',
    loading: '加载中...',
    submitting: '提交中...',
    days: '天',
    
    nav: {
      home: '首页',
      leavePlan: '休假计划',
      teamStats: '团队统计',
    },
    
    homePage: {
      badge: '简单高效的团队休假管理',
      title1: '让休假计划',
      title2: '一目了然',
      subtitle: 'Leavely 帮助团队轻松管理休假计划，PM可以快速查看团队成员的休假安排，让项目规划更加顺畅。',
      ctaSubmit: '休假计划',
      ctaView: '查看统计',
      feature1Title: '团队管理',
      feature1Desc: '团队成员可以轻松提交自己的休假计划，包括姓名、联系方式和休假时间段。',
      feature2Title: '日历视图',
      feature2Desc: '通过直观的日历视图，一眼看出每天有多少人休假，便于项目资源规划。',
      feature3Title: '详细统计',
      feature3Desc: 'PM可以查看每个人的休假详情，了解团队整体休假情况，做出更好的决策。',
      howToUse: '开始使用 Leavely',
      howToUseSubtitle: '简单三步，让团队休假管理变得简单',
      step1Title: '填写信息',
      step1Desc: '输入姓名和联系方式',
      step2Title: '选择日期',
      step2Desc: '选择计划休假时间段',
      step3Title: '提交假期计划',
      step3Desc: '系统自动汇总统计',
      footer: '© 2025 Leavely - 团队休假管理工具',
    },
    
    submitPage: {
      title: '休假计划',
      subtitle: '填写您的信息和计划休假时间',
      personalInfo: '个人信息',
      name: '姓名',
      namePlaceholder: '请输入您的姓名',
      contact: '联系方式',
      contactPlaceholder: '手机号码或邮箱',
      selectDate: '选择休假日期',
      selectStartDate: '👆 点击日历选择休假开始日期',
      selectEndDate: '✨ 已选择开始日期，请继续选择结束日期',
      remarkTitle: '备注说明',
      remarkOptional: '(可选)',
      remarkPlaceholder: '添加休假原因或其他说明...',
      submitButton: '提交假期计划',
      successTitle: '提交成功！',
      successMessage: '您的休假申请已记录，正在跳转到统计页面...',
      errorName: '请输入姓名',
      errorContact: '请输入联系方式',
      errorStartDate: '请选择开始日期',
      errorEndDate: '请选择结束日期',
      errorSubmit: '提交失败，请重试',
    },
    
    dashboardPage: {
      title: '团队休假统计',
      subtitle: '查看团队整体休假情况，便于项目规划',
      calendarView: '日历视图',
      listView: '列表视图',
      totalLeaves: '休假申请',
      teamMembers: '团队成员',
      totalDays: '总休假天数',
      onLeaveToday: '今日休假',
      selectDateToView: '选择日期查看详情',
      clickToViewDetails: '点击日历上的日期查看休假详情',
      noLeaveOnDay: '当日无人休假 🎉',
      searchPlaceholder: '搜索成员姓名或联系方式...',
      noMatchingRecords: '未找到匹配的记录',
      noLeaveRecords: '暂无休假记录',
      tryOtherKeywords: '尝试使用其他关键词搜索',
      recordsWillShow: '团队成员提交休假申请后将在这里显示',
    },
    
    calendar: {
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      startDate: '开始日期',
      endDate: '结束日期',
      notSelected: '未选择',
      selectedRange: '已选择休假时间',
      holiday: '法定假日',
      workday: '调休上班',
      selectedRange2: '已选范围',
      onePerson: '1人休假',
      twoPeople: '2人休假',
      threeOrMore: '3人以上',
    },
    
    holidays: {
      newYear: '元旦',
      springFestival: '春节',
      qingming: '清明节',
      laborDay: '劳动节',
      dragonBoat: '端午节',
      midAutumn: '中秋节',
      nationalDay: '国庆节',
      workdayMakeup: '调休',
    },
    
    leaveCard: {
      remark: '备注',
      confirmDelete: '确定要删除这条休假记录吗？',
    },
    
    calendarIntegration: {
      addToCalendar: '添加到日历',
      downloadICS: '下载 ICS 文件',
      addToOutlook: '添加到 Outlook',
      addToGoogle: '添加到 Google 日历',
      subscribeCalendar: '订阅日历',
      subscribeDesc: '将此链接添加到 Outlook 或其他日历应用中，可自动同步团队休假信息',
      copyLink: '复制链接',
      copied: '已复制！',
      exportAll: '导出全部',
    },
  },
  
  en: {
    appName: 'Leavely',
    home: 'Home',
    leavePlan: 'Leave Plan',
    teamStats: 'Team Stats',
    submit: 'Submit',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',
    clear: 'Clear',
    search: 'Search',
    loading: 'Loading...',
    submitting: 'Submitting...',
    days: 'days',
    
    nav: {
      home: 'Home',
      leavePlan: 'Leave Plan',
      teamStats: 'Team Stats',
    },
    
    homePage: {
      badge: 'Simple & Efficient Team Leave Management',
      title1: 'Make Leave Plans',
      title2: 'Crystal Clear',
      subtitle: 'Leavely helps teams easily manage leave schedules. PMs can quickly view team members\' leave arrangements for smoother project planning.',
      ctaSubmit: 'Plan Leave',
      ctaView: 'View Stats',
      feature1Title: 'Team Management',
      feature1Desc: 'Team members can easily submit their leave plans, including name, contact info, and leave period.',
      feature2Title: 'Calendar View',
      feature2Desc: 'Intuitive calendar view shows how many people are on leave each day, facilitating resource planning.',
      feature3Title: 'Detailed Stats',
      feature3Desc: 'PMs can view everyone\'s leave details, understand the team\'s overall leave situation, and make better decisions.',
      howToUse: 'Get Started with Leavely',
      howToUseSubtitle: 'Three simple steps to manage team leaves',
      step1Title: 'Fill Info',
      step1Desc: 'Enter name and contact',
      step2Title: 'Select Dates',
      step2Desc: 'Choose your leave period',
      step3Title: 'Submit Plan',
      step3Desc: 'Auto-aggregated stats',
      footer: '© 2025 Leavely - Team Leave Management Tool',
    },
    
    submitPage: {
      title: 'Leave Plan',
      subtitle: 'Fill in your information and planned leave dates',
      personalInfo: 'Personal Information',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      contact: 'Contact',
      contactPlaceholder: 'Phone number or email',
      selectDate: 'Select Leave Dates',
      selectStartDate: '👆 Click calendar to select start date',
      selectEndDate: '✨ Start date selected, please select end date',
      remarkTitle: 'Remarks',
      remarkOptional: '(Optional)',
      remarkPlaceholder: 'Add leave reason or other notes...',
      submitButton: 'Submit Leave Plan',
      successTitle: 'Success!',
      successMessage: 'Your leave request has been recorded, redirecting to stats page...',
      errorName: 'Please enter your name',
      errorContact: 'Please enter contact info',
      errorStartDate: 'Please select start date',
      errorEndDate: 'Please select end date',
      errorSubmit: 'Submission failed, please retry',
    },
    
    dashboardPage: {
      title: 'Team Leave Statistics',
      subtitle: 'View team leave status for project planning',
      calendarView: 'Calendar',
      listView: 'List',
      totalLeaves: 'Leave Requests',
      teamMembers: 'Team Members',
      totalDays: 'Total Leave Days',
      onLeaveToday: 'On Leave Today',
      selectDateToView: 'Select date to view details',
      clickToViewDetails: 'Click a date on the calendar to view leave details',
      noLeaveOnDay: 'No one on leave 🎉',
      searchPlaceholder: 'Search by name or contact...',
      noMatchingRecords: 'No matching records found',
      noLeaveRecords: 'No leave records yet',
      tryOtherKeywords: 'Try searching with different keywords',
      recordsWillShow: 'Leave records will appear here after team members submit',
    },
    
    calendar: {
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      startDate: 'Start Date',
      endDate: 'End Date',
      notSelected: 'Not selected',
      selectedRange: 'Selected Leave Period',
      holiday: 'Public Holiday',
      workday: 'Makeup Workday',
      selectedRange2: 'Selected Range',
      onePerson: '1 on leave',
      twoPeople: '2 on leave',
      threeOrMore: '3+ on leave',
    },
    
    holidays: {
      newYear: 'New Year',
      springFestival: 'Spring Festival',
      qingming: 'Qingming',
      laborDay: 'Labor Day',
      dragonBoat: 'Dragon Boat',
      midAutumn: 'Mid-Autumn',
      nationalDay: 'National Day',
      workdayMakeup: 'Makeup',
    },
    
    leaveCard: {
      remark: 'Remark',
      confirmDelete: 'Are you sure you want to delete this leave record?',
    },
    
    calendarIntegration: {
      addToCalendar: 'Add to Calendar',
      downloadICS: 'Download ICS',
      addToOutlook: 'Add to Outlook',
      addToGoogle: 'Add to Google Calendar',
      subscribeCalendar: 'Subscribe Calendar',
      subscribeDesc: 'Add this link to Outlook or other calendar apps to auto-sync team leave info',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      exportAll: 'Export All',
    },
  },
};

