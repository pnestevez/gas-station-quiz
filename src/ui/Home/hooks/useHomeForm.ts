import { useInput } from "@/components/Input";
import { fuelValidation } from "@/utils/validations";

const useHomeForm = () => {
  const fuelDispenser = useInput<string>({
    value: "",
    emptyValue: "",
    validateError: fuelValidation,
  });

  const fuelCost = useInput<string>({
    value: "",
    emptyValue: "",
    validateError: fuelValidation,
  });

  const hasError = [fuelDispenser, fuelCost].some((i) => i.hasError);

  const buildObject = (): [number[], number[]] => {
    const _fuelDispenser = fuelDispenser.value.trim().split(",").map(Number);
    const _fuelCost = fuelCost.value.trim().split(",").map(Number);

    return [_fuelDispenser, _fuelCost];
  };

  return {
    fuelDispenser,
    fuelCost,
    hasError,
    buildObject,
  };
};

export default useHomeForm;
