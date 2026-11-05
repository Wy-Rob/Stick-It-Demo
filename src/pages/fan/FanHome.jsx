import FanMembership from "./FanMembership";
import FanConnect from "./FanConnect";
import FanMeet from "./FanMeet";

export default function FanHome({ store }) {
  return (
    <>
      <section className="anchor" id="membership"><FanMembership store={store} /></section>
      <section className="band anchor" id="connect"><FanConnect store={store} /></section>
      <section className="anchor" id="meet"><FanMeet store={store} /></section>
    </>
  );
}