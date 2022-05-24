export class UtilService {
  getToday = () => {
    const createdAt = new Date();
    const yyyy = createdAt.getFullYear();
    const mm = createdAt.getMonth() + 1;
    const dd = createdAt.getDate();
    const today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  blindPersonalNumber = (personalNumber) => {
    const splitNumber = [...personalNumber.split("-")];
    const result = splitNumber[0] + "-" + splitNumber[1].slice(0, 1).padEnd(7, "*");

    return result;
  };
}
