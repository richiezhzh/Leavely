// 中国大陆法定节假日数据
// 包含2025年和2026年的节假日安排

export interface Holiday {
  date: string; // YYYY-MM-DD 格式
  name: string;
  type: 'holiday' | 'workday'; // holiday=放假, workday=调休上班
}

// 2025年法定节假日
const holidays2025: Holiday[] = [
  // 元旦
  { date: '2025-01-01', name: '元旦', type: 'holiday' },
  
  // 春节 (1月28日-2月4日放假，1月26日、2月8日上班)
  { date: '2025-01-26', name: '春节调休', type: 'workday' },
  { date: '2025-01-28', name: '春节', type: 'holiday' },
  { date: '2025-01-29', name: '春节', type: 'holiday' },
  { date: '2025-01-30', name: '春节', type: 'holiday' },
  { date: '2025-01-31', name: '春节', type: 'holiday' },
  { date: '2025-02-01', name: '春节', type: 'holiday' },
  { date: '2025-02-02', name: '春节', type: 'holiday' },
  { date: '2025-02-03', name: '春节', type: 'holiday' },
  { date: '2025-02-04', name: '春节', type: 'holiday' },
  { date: '2025-02-08', name: '春节调休', type: 'workday' },
  
  // 清明节 (4月4日-6日放假)
  { date: '2025-04-04', name: '清明节', type: 'holiday' },
  { date: '2025-04-05', name: '清明节', type: 'holiday' },
  { date: '2025-04-06', name: '清明节', type: 'holiday' },
  
  // 劳动节 (5月1日-5日放假，4月27日上班)
  { date: '2025-04-27', name: '劳动节调休', type: 'workday' },
  { date: '2025-05-01', name: '劳动节', type: 'holiday' },
  { date: '2025-05-02', name: '劳动节', type: 'holiday' },
  { date: '2025-05-03', name: '劳动节', type: 'holiday' },
  { date: '2025-05-04', name: '劳动节', type: 'holiday' },
  { date: '2025-05-05', name: '劳动节', type: 'holiday' },
  
  // 端午节 (5月31日-6月2日放假)
  { date: '2025-05-31', name: '端午节', type: 'holiday' },
  { date: '2025-06-01', name: '端午节', type: 'holiday' },
  { date: '2025-06-02', name: '端午节', type: 'holiday' },
  
  // 中秋节+国庆节 (10月1日-8日放假，9月28日、10月11日上班)
  { date: '2025-09-28', name: '国庆调休', type: 'workday' },
  { date: '2025-10-01', name: '国庆节', type: 'holiday' },
  { date: '2025-10-02', name: '国庆节', type: 'holiday' },
  { date: '2025-10-03', name: '国庆节', type: 'holiday' },
  { date: '2025-10-04', name: '中秋节', type: 'holiday' },
  { date: '2025-10-05', name: '国庆节', type: 'holiday' },
  { date: '2025-10-06', name: '国庆节', type: 'holiday' },
  { date: '2025-10-07', name: '国庆节', type: 'holiday' },
  { date: '2025-10-08', name: '国庆节', type: 'holiday' },
  { date: '2025-10-11', name: '国庆调休', type: 'workday' },
];

// 2026年法定节假日
const holidays2026: Holiday[] = [
  // 元旦
  { date: '2026-01-01', name: '元旦', type: 'holiday' },
  { date: '2026-01-02', name: '元旦', type: 'holiday' },
  { date: '2026-01-03', name: '元旦', type: 'holiday' },
  
  // 春节 (2月17日-23日放假，2月14日、2月28日上班)
  { date: '2026-02-14', name: '春节调休', type: 'workday' },
  { date: '2026-02-17', name: '春节', type: 'holiday' },
  { date: '2026-02-18', name: '春节', type: 'holiday' },
  { date: '2026-02-19', name: '春节', type: 'holiday' },
  { date: '2026-02-20', name: '春节', type: 'holiday' },
  { date: '2026-02-21', name: '春节', type: 'holiday' },
  { date: '2026-02-22', name: '春节', type: 'holiday' },
  { date: '2026-02-23', name: '春节', type: 'holiday' },
  { date: '2026-02-28', name: '春节调休', type: 'workday' },
  
  // 清明节 (4月4日-6日放假)
  { date: '2026-04-04', name: '清明节', type: 'holiday' },
  { date: '2026-04-05', name: '清明节', type: 'holiday' },
  { date: '2026-04-06', name: '清明节', type: 'holiday' },
  
  // 劳动节 (5月1日-5日放假，4月26日上班)
  { date: '2026-04-26', name: '劳动节调休', type: 'workday' },
  { date: '2026-05-01', name: '劳动节', type: 'holiday' },
  { date: '2026-05-02', name: '劳动节', type: 'holiday' },
  { date: '2026-05-03', name: '劳动节', type: 'holiday' },
  { date: '2026-05-04', name: '劳动节', type: 'holiday' },
  { date: '2026-05-05', name: '劳动节', type: 'holiday' },
  
  // 端午节 (6月19日-21日放假)
  { date: '2026-06-19', name: '端午节', type: 'holiday' },
  { date: '2026-06-20', name: '端午节', type: 'holiday' },
  { date: '2026-06-21', name: '端午节', type: 'holiday' },
  
  // 中秋节 (9月25日-27日放假)
  { date: '2026-09-25', name: '中秋节', type: 'holiday' },
  { date: '2026-09-26', name: '中秋节', type: 'holiday' },
  { date: '2026-09-27', name: '中秋节', type: 'holiday' },
  
  // 国庆节 (10月1日-7日放假，9月27日、10月10日上班)
  { date: '2026-10-01', name: '国庆节', type: 'holiday' },
  { date: '2026-10-02', name: '国庆节', type: 'holiday' },
  { date: '2026-10-03', name: '国庆节', type: 'holiday' },
  { date: '2026-10-04', name: '国庆节', type: 'holiday' },
  { date: '2026-10-05', name: '国庆节', type: 'holiday' },
  { date: '2026-10-06', name: '国庆节', type: 'holiday' },
  { date: '2026-10-07', name: '国庆节', type: 'holiday' },
  { date: '2026-10-10', name: '国庆调休', type: 'workday' },
];

// 合并所有节假日数据
const allHolidays: Holiday[] = [...holidays2025, ...holidays2026];

// 创建快速查询的 Map
const holidayMap = new Map<string, Holiday>();
allHolidays.forEach(h => holidayMap.set(h.date, h));

/**
 * 根据日期获取节假日信息
 * @param date Date 对象或 YYYY-MM-DD 格式字符串
 * @returns Holiday 对象或 undefined
 */
export function getHoliday(date: Date | string): Holiday | undefined {
  const dateStr = typeof date === 'string' 
    ? date 
    : date.toISOString().split('T')[0];
  return holidayMap.get(dateStr);
}

/**
 * 检查某天是否是法定假日
 */
export function isHoliday(date: Date | string): boolean {
  const holiday = getHoliday(date);
  return holiday?.type === 'holiday';
}

/**
 * 检查某天是否是调休工作日
 */
export function isWorkday(date: Date | string): boolean {
  const holiday = getHoliday(date);
  return holiday?.type === 'workday';
}

/**
 * 获取节假日名称
 */
export function getHolidayName(date: Date | string): string | undefined {
  return getHoliday(date)?.name;
}

/**
 * 获取节假日图标
 */
export function getHolidayEmoji(name: string): string {
  if (name.includes('春节')) return '🧧';
  if (name.includes('元旦')) return '🎊';
  if (name.includes('清明')) return '🌿';
  if (name.includes('劳动')) return '💪';
  if (name.includes('端午')) return '🐲';
  if (name.includes('中秋')) return '🥮';
  if (name.includes('国庆')) return '🇨🇳';
  if (name.includes('调休')) return '💼';
  return '🎉';
}

