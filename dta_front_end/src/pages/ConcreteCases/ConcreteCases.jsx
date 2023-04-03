import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "src/components/AppLayout/AppLayout";
import { CONCRETECASES } from "src/api/urls";
import LinkButtonWithArrow from "src/components/LinkButtonWithArrow/LinkButtonWithArrow";
import { CONCRETE_CASES_DETAIL_ROUTE ,CONCRETECASE_ADMIN_DATA} from "src/utils/constant";
import { concreteCasesData } from "./data";
import { makePostRequest } from "src/utils/makePostRequest";
import { useQuery } from "react-query";
import concreteImg8 from "../../assets/c8.png"

const ConcreteCases = () => {
  const { t } = useTranslation();
  const { data: concretecasesContent, isLoading } = useQuery(CONCRETECASES, () =>
    makePostRequest(CONCRETECASES)
  );
  const keyId=concretecasesContent!==undefined?concretecasesContent.data:[]
  return (
    <AppLayout isLoading={isLoading}>
      <h2
        className="app-blue-title"
        style={{ padding: "1.5rem 0rem", marginBottom: "4.5rem" }}
      >
        {t("concrete_Heading")}
        <span style={{ fontWeight: 400 }} className="font-family-regular">
          {t("concrete_Heading_2")}{console.log(keyId.length)}
        </span>
      </h2>
      <div
        className="d-flex flex-wrap"
        style={{ columnGap: "19px", rowGap: "110px" }}
      >
        {concreteCasesData?.map((data, index) => (
          <CaseStudyCard key={index} data={data} />
        ))}
        {concretecasesContent!==undefined&&keyId.length!==0&&
         keyId.map((data,index)=>
          <CaseStudyCard2 data={concretecasesContent.data[index]} key={keyId.con_id} />
        ) }
      </div>
    </AppLayout>
  );
};

const CaseStudyCard = ({ key, data }) => {
  const { t } = useTranslation();

  return (
    <div className="case-study-card" key={key}>
      <img
        src={data?.img}
        style={{
          borderRadius: "12px",
          marginTop: "-90px",
          marginBottom: "26px",
          width: "130px",
          height: "130px",
          objectFit: "cover",
        }}
      />
      <h2>{t(data.title)}</h2>
      <p className="font-family-regular" style={{ height: "112px" }}>
        {t(data.content1)}
      </p>
      <div className="mb-1">
        <LinkButtonWithArrow
          color={"#136378"}
          fontSize={"14px"}
          fontWeight={"600"}
          text={t("read_more")}
          state={data}
          to={CONCRETE_CASES_DETAIL_ROUTE(data?.id)}
        />
      </div>
    </div>
  );
};
const CaseStudyCard2 = ({ key, data }) => {
  const { t } = useTranslation();

  return (
    <div className="case-study-card" key={key}>
      <img
        src={concreteImg8}
        style={{
          borderRadius: "12px",
          marginTop: "-90px",
          marginBottom: "26px",
          width: "130px",
          height: "130px",
          objectFit: "cover",
        }}
      />
      <h2>{data?.title}</h2>
      <p className="font-family-regular" style={{ height: "112px" }}>
        {data?.contnet1}
      </p>
      <div className="mb-1">
        <LinkButtonWithArrow
          color={"#136378"}
          fontSize={"14px"}
          fontWeight={"600"}
          text={t("read_more")}
          state={data}
          to={CONCRETECASE_ADMIN_DATA(data)}
        />
      </div>
    </div>
  );
};

export default ConcreteCases;
