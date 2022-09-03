import "./Title.css";

type Tprops = {
  title: string;
};
export default function Title(props: Tprops) {
  const { title } = props;
  return <div className="rankTitle">{title} 장르 랭킹</div>;
}
