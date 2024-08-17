/**
 * @description 출원번호 검사
 */
const isApplicationNumber = (str: string) => /^\d{13}$/.test(str);
