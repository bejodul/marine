import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import CustomInput from "./component/PickersComponent";
import { DateType } from "src/types/forms/reactDatepickerTypes";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AutocompleteComp from "./component/AutocompleteController";
import { addDays } from "date-fns";
import TextController from "./component/TextController";
import DatePickerController from "./component/DatePickerController";

const defaultValues = {
  vesCode: "",
  pkkNo: "",
  eta: null,
};

interface FormInputs {
  vesCode: string;
  pkkNo: string;
  dob: DateType;
}

interface AutocompleteOptions {
  id: string;
  label: string;
}

export default function Entry({
  popperPlacement,
}: {
  popperPlacement: ReactDatePickerProps["popperPlacement"];
}) {
  const [bc11Date, setBc11Date] = useState<DateType>();
  const [jobStartDate, setJobStartDate] = useState<DateType>();
  const [jobEndDate, setJobEndDate] = useState<DateType>();
  const [gateEndDate, setGateEndDate] = useState<DateType>();
  const [eta, setEta] = useState<DateType>();
  const [etd, setEtd] = useState<DateType>();
  const [vesData, setVesData] = useState<AutocompleteOptions[]>([]);
  const [cnOriginOption, setCnOriginOption] = useState<AutocompleteOptions[]>(
    []
  );
  const [cnOrigin, setCnOrigin] = useState("");
  const [portOriginOption, setPortOriginOption] = useState<
    AutocompleteOptions[]
  >([]);
  const [cnBeforeOption, setCnBeforeOption] = useState<AutocompleteOptions[]>(
    []
  );
  const [cnBefore, setCnBefore] = useState("");
  const [portBeforeOption, setPortBeforeOption] = useState<
    AutocompleteOptions[]
  >([]);
  const [cnNextOption, setCnNextOption] = useState<AutocompleteOptions[]>([]);
  const [cnNext, setCnNext] = useState("");
  const [portNextOption, setPortNextOption] = useState<AutocompleteOptions[]>(
    []
  );
  const [cnFinalOption, setCnFinalOption] = useState<AutocompleteOptions[]>([]);
  const [cnFinal, setCnFinal] = useState("");
  const [portFinalOption, setPortFinalOption] = useState<AutocompleteOptions[]>(
    []
  );
  const [visitTypeData, setVisitTypeData] = useState<AutocompleteOptions[]>([]);
  const [kemasanData, setKemasanData] = useState<AutocompleteOptions[]>([]);
  const [kegiatanData, setKegiatanData] = useState<AutocompleteOptions[]>([]);

  const minDate = new Date();
  const maxDate = addDays(new Date(), 31);

  async function fetchVessel() {
    const res = await fetch(`${process.env.API_URL}/api/vessel/?id=a`);
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { vesCode, vesName } = item;
      const id = vesCode;
      const label = vesName;

      return { id, label };
    });

    setVesData(newData);
  }

  async function fetchCountry() {
    const res = await fetch(`${process.env.API_URL}/api/country/?id=a`);
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { kdBendera, nmBendera } = item;
      const id = kdBendera;
      const label = nmBendera;

      return { id, label };
    });

    setCnOriginOption(newData);
    setCnBeforeOption(newData);
    setCnNextOption(newData);
    setCnFinalOption(newData);
  }

  async function fetchPort(props: { flag: string; type: string }) {
    const { flag, type } = props;
    const res = await fetch(`${process.env.API_URL}/api/port/?cn=${flag}`);
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { portCode, flag, portName } = item;
      const id = flag.trim() + portCode.trim();
      const label = portName;

      return { id, label };
    });

    if (type === "origin") setPortOriginOption(newData);
    else if (type === "before") setPortBeforeOption(newData);
    else if (type === "next") setPortNextOption(newData);
    else if (type === "final") setPortFinalOption(newData);
  }

  async function fetchKunjungan() {
    const res = await fetch(`${process.env.API_URL}/api/syscode/?id=VISIT_TYP`);
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { codeRef, descr } = item;
      const id = codeRef.trim();
      const label = descr;

      return { id, label };
    });

    setVisitTypeData(newData);
  }

  async function fetchKegiatan() {
    const res = await fetch(
      `${process.env.API_URL}/api/syscode/?id=VESACT_TYP`
    );
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { codeRef, descr } = item;
      const id = codeRef.trim();
      const label = descr;

      return { id, label };
    });

    setKegiatanData(newData);
  }

  async function fetchKemasan() {
    const res = await fetch(`${process.env.API_URL}/api/kemasan/?id=a`);
    const json = await res.json();
    const data = json.data;

    const newData: AutocompleteOptions[] = data.map((item) => {
      const { kdKemasan, detKdKemasan } = item;
      const id = kdKemasan.trim();
      const label = detKdKemasan;

      return { id, label };
    });

    setKemasanData(newData);
  }

  useEffect(() => {
    fetchVessel();
    fetchCountry();
    fetchKunjungan();
    fetchKemasan();
    fetchKegiatan();
  }, []);

  const cnOriginPreviousRef = useRef(cnOrigin);
  const cnBeforePreviousRef = useRef(cnBefore);
  const cnNextPreviousRef = useRef(cnNext);
  const cnFinalPreviousRef = useRef(cnFinal);

  useEffect(() => {
    if (cnOrigin !== cnOriginPreviousRef.current) {
      fetchPort({ flag: cnOrigin, type: "origin" });
    } else if (cnBefore !== cnBeforePreviousRef.current) {
      fetchPort({ flag: cnBefore, type: "before" });
    } else if (cnNext !== cnNextPreviousRef.current) {
      fetchPort({ flag: cnNext, type: "next" });
    } else if (cnFinal !== cnFinalPreviousRef.current) {
      fetchPort({ flag: cnFinal, type: "final" });
    }

    cnOriginPreviousRef.current = cnOrigin;
    cnBeforePreviousRef.current = cnBefore;
    cnNextPreviousRef.current = cnNext;
    cnFinalPreviousRef.current = cnFinal;
  }, [cnOrigin, cnBefore, cnNext, cnFinal]);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues });

  const onSubmit = () => toast.success("Form Submitted");

  return (
    <Card>
      <CardHeader title="PKK"></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <AutocompleteComp
                name="vesCode"
                data={vesData}
                label="Nama Kapal"
                placeHolder="Nama Kapal"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} lg={4} md={4} sm={4}>
              <TextController
                control={control}
                label="No PKK"
                name="noPkk"
                placeHolder="No PKK"
                errors={errors}
              />
            </Grid>
            <Grid item xs={6} lg={4} md={4} sm={4}>
              <TextController
                control={control}
                errors={errors}
                label="No BC 1.1*"
                name="noBc11"
                placeHolder="No BC 1.1"
              />
            </Grid>
            <Grid item xs={6} lg={4} md={4} sm={4}>
              <DatePickerWrapper>
                <DatePicker
                  selected={bc11Date}
                  dateFormat={"dd/MM/yyyy"}
                  id="bc11Date"
                  onChange={(dateFormat: Date) => setBc11Date(dateFormat)}
                  popperPlacement={popperPlacement}
                  placeholderText="dd/mm/yyyy"

                  // customInput={
                  //   <CustomInput
                  //     label="Tanggal BC 1.1*"

                  //     //errors={errors}
                  //     //name="bc11Date"
                  //   ></CustomInput>
                  // }
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <DatePickerWrapper>
                <DatePicker
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  selected={jobStartDate}
                  dateFormat={"dd/MM/yyyy HH:mm"}
                  id="jobStartDate"
                  onChange={(dateFormat: Date) => setJobStartDate(dateFormat)}
                  popperPlacement={popperPlacement}
                  placeholderText="dd/mm/yyyy hh:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  customInput={
                    <CustomInput
                      label="Batas Awal Job Order*"
                      errors={errors}
                      name="jobStartDate"
                    ></CustomInput>
                  }
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <DatePickerWrapper>
                <DatePicker
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  dateFormat={"dd/MM/yyyy HH:mm"}
                  id="jobEndDate"
                  selected={jobEndDate}
                  onChange={(dateFormat: Date) => setJobEndDate(dateFormat)}
                  popperPlacement={popperPlacement}
                  placeholderText="dd/mm/yyyy hh:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  customInput={
                    <CustomInput
                      label="Batas Akhir Job Order*"
                      errors={errors}
                      name="jobEndDate"
                    ></CustomInput>
                  }
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <DatePickerWrapper>
                <DatePicker
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  dateFormat={"dd/MM/yyyy HH:mm"}
                  id="gateEndDate"
                  selected={gateEndDate}
                  onChange={(dateFormat: Date) => setGateEndDate(dateFormat)}
                  popperPlacement={popperPlacement}
                  placeholderText="dd/mm/yyyy hh:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  customInput={
                    <CustomInput
                      label="Batas Akhir Masuk Gate*"
                      errors={errors}
                      name="gateEndDate"
                    />
                  }
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}></Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <TextController
                control={control}
                label="Voy In*"
                name="voyIn"
                placeHolder="Voy In"
                errors={errors}
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <TextController
                control={control}
                label="Voy Out*"
                name="voyOut"
                placeHolder="Voy Out"
                errors={errors}
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <DatePickerController
                control={control}
                errors={errors}
                format="dd/MM/yyyy HH:mm"
                id="etaId"
                label="Tanggal Tiba"
                name="etaController"
                placeHolder="dd/mm/yyyy hh:mm"
                popperPlacement={popperPlacement}
                setValue={setEta}
                value={eta}
                maxDate={maxDate}
                minDate={minDate}
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <DatePickerController
                format="dd/MM/yyyy HH:mm"
                placeHolder="dd/mm/yyyy hh:mm"
                id="etd"
                value={etd}
                setValue={setEtd}
                control={control}
                errors={errors}
                popperPlacement={popperPlacement}
                minDate={minDate}
                maxDate={maxDate}
                label="Tanggal Berangkat*"
                name="etd"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={visitTypeData}
                errors={errors}
                label="Jenis Kunjungan"
                name="visitType"
                placeHolder="Jenis Kunjungan"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={kemasanData}
                errors={errors}
                label="Jenis Kemasan"
                name="jnKemasan"
                placeHolder="Jenis Kemasan"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={kegiatanData}
                errors={errors}
                label="Jenis Kegiatan"
                name="jnKegiatan"
                placeHolder="Jenis Kegiatan"
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3} sm={3}></Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={cnOriginOption}
                errors={errors}
                setData={setCnOrigin}
                label="Negara Asal"
                name="cnOriginId"
                placeHolder="Negara Asal"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={portOriginOption}
                errors={errors}
                label="Pelabuhan Asal"
                name="portOrigin"
                placeHolder="Pelabuhan Asal"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={cnBeforeOption}
                setData={setCnBefore}
                errors={errors}
                label="Negara Sebelum"
                name="cnBefore"
                placeHolder="Negara Sebelum"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={portBeforeOption}
                errors={errors}
                name="portBefore"
                label="Pelabuhan Sebelum"
                placeHolder="Pelabuhan Sebelum"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={cnNextOption}
                setData={setCnNext}
                errors={errors}
                label="Negara Berikut"
                name="cnNext"
                placeHolder="Negara Berikut"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={portNextOption}
                errors={errors}
                label="Pelabuhan Berikut"
                name="portNext"
                placeHolder="Pelabuhan Berikut"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                data={cnFinalOption}
                setData={setCnFinal}
                errors={errors}
                label="Negara Akhir"
                name="cnFinal"
                placeHolder="Negara Akhir"
              />
            </Grid>
            <Grid item xs={6} lg={3} md={3} sm={3}>
              <AutocompleteComp
                control={control}
                errors={errors}
                label="Pelabuhan Akhir"
                name="portFinal"
                data={portFinalOption}
                placeHolder="Pelabuhan Akhir"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
