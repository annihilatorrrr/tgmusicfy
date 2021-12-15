export default function isMorning(ctx: any) {
  if (ctx.state.lastMessage) {
    if (ctx.state.lastMessage.getDate() !== new Date().getDate() && new Date().getHours() < 9 && new Date().getHours() < 4) {
      return true;
    }
    return false;
  }
  return false;
}
