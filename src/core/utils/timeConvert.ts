/*
Функция конвертирует минуты в удобно читаемый формат времени
 */
export function timeConvert(n: number) {
  const hours = (n / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  if (n >= 60) {
    return `${rhours} ч ${rminutes} мин`;
  }

  return `${rminutes} мин`;
}
