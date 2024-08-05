import "./index.less";

const Notfound = () => {
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h3 className=" text-3xl w-full text-center tracking-widest">404 - Not found</h3>
      </div>
      <div className="contant_box_404 flex items-center flex-col mt-[-36px] text-3xl">
        <a href="" className="link_404 rounded-lg">
          Go to Home
        </a>
      </div>
    </section>
  );
};

export default Notfound;
