export default function isMorning(ctx: any): boolean {
  if (ctx.session.newDate) {
    if (ctx.session.newDate !== new Date().getDate() && new Date().getHours() < 9 && new Date().getHours() > 4) {
      return true;
    }
    return false;
  }
  return false;
}
