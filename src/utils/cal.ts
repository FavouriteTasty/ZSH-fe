export const bmi = (weight: number, height: number) => weight / height / height;

export function calculateAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString);

    let age = today.getFullYear() - birthDate.getFullYear();

    // 判断生日是否已过
    const hasBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
        age--;
    }

    return age;
}
