type AvatarProps = {
  string: string;
};

const colorGroups = {
  "A-D": "bg-red-200",
  "E-H": "bg-orange-200",
  "I-L": "bg-yellow-200",
  "M-P": "bg-green-200",
  "Q-T": "bg-blue-200",
  "U-X": "bg-indigo-200",
  "Y-Z": "bg-purple-200",
};

export default function Avatar({ string }: AvatarProps): JSX.Element {
  const getColor = (letter: string) => {
    const upperCaseLetter = letter.toUpperCase();

    if (upperCaseLetter >= "A" && upperCaseLetter <= "D")
      return colorGroups["A-D"];
    if (upperCaseLetter >= "E" && upperCaseLetter <= "H")
      return colorGroups["E-H"];
    if (upperCaseLetter >= "I" && upperCaseLetter <= "L")
      return colorGroups["I-L"];
    if (upperCaseLetter >= "M" && upperCaseLetter <= "P")
      return colorGroups["M-P"];
    if (upperCaseLetter >= "Q" && upperCaseLetter <= "T")
      return colorGroups["Q-T"];
    if (upperCaseLetter >= "U" && upperCaseLetter <= "X")
      return colorGroups["U-X"];
    if (upperCaseLetter >= "Y" && upperCaseLetter <= "Z")
      return colorGroups["Y-Z"];

    return "bg-gray-300"; // default color
  };

  return (
    <span
      className={`h-8 w-8 rounded-full flex items-center justify-center ${getColor(
        string[0]
      )}`}
    >
      {string
        .split(" ")
        .map((item: string) => item[0])
        .join("") ?? ""}
    </span>
  );
}
