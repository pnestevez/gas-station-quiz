import Layout from "@/components/Layout";
import Input from "../../components/Input";
import Image from "next/image";
import Button from "@/components/Button";
import useHomeForm from "./hooks/useHomeForm";
import Alert from "@/components/Alert";
import { useState } from "react";
import Title from "@/components/Title";

export type HomeProps = {
  findStartingGasStation: (
    fuelDispenser: number[],
    fuelCost: number[]
  ) => number;
  validateFields: (fuelDispenser: number[], fuelCost: number[]) => boolean;
};

const Home = ({
  findStartingGasStation,
  validateFields,
}: HomeProps): JSX.Element => {
  const { fuelDispenser, fuelCost, hasError, buildObject } = useHomeForm();

  const [result, setResult] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/fuel-dispenser.png"
          alt="Fuel dispenser"
          width={150}
          height={150}
          className="animate-bounce"
        />

        {showAlert && (
          <Alert
            title="Invalid fields content"
            subtitle="Both entries must contain the same amount of numbers"
            iconSize="md"
            onClick={() => setShowAlert(false)}
          />
        )}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex flex-col gap-10"
        >
          <section className="flex flex-col gap-4">
            <Input
              id="fuel-dispenser"
              name="fuelDispenser"
              type="text"
              label="Fuel dispensers"
              placeholder="1, 2, 3, 4, 5"
              {...fuelDispenser}
              onChange={(e) => {
                result && setResult(null);
                fuelDispenser.onChange(e.target.value);
              }}
              isClearable
              hasMsg
              assistiveMsg="Indicate the amount of fuel available at each pump."
            />

            <Input
              id="fuel-cost"
              name="fuelCost"
              type="text"
              label="Fuel consumption"
              placeholder="5, 4, 3, 2, 1"
              {...fuelCost}
              onChange={(e) => {
                result && setResult(null);
                fuelCost.onChange(e.target.value);
              }}
              isClearable
              hasMsg
              assistiveMsg="Indicate the amount of fuel needed to advance to the next gas station."
            />
          </section>

          {result && (
            <Title variant="h1" alignment="center">
              {result < 0 ? result : `Start in #${result}`}
            </Title>
          )}
          <Button
            id="find-station"
            type="submit"
            onClick={() => {
              const args = buildObject();

              if (!validateFields(...args)) return setShowAlert(true);

              setResult(findStartingGasStation(...args));
            }}
            disabled={hasError}
          >
            Calculate
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
