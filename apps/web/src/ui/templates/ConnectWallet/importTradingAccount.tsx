import {
  EyeIcon,
  EyeSlashIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Button, Interaction, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { DecodedFile } from "@orderbook/core/providers/user/walletProvider";

import { ErrorMessage, OptionalField } from "../ReadyToUse";
import { Input } from "../Input";

const initialValues = {
  file: null,
};

const initialState = ["", "", "", "", ""];
export const ImportTradingAccount = ({
  onBack,
  onClose,
  onAction,
  onRedirect,
}: {
  onBack: () => void;
  onClose: () => void;
  onAction: (values: { password: string; file: DecodedFile }) => void;
  onRedirect: () => void;
}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [state, setState] = useState<(string | number)[]>(initialState);

  const { isValid, dirty, handleSubmit, setFieldValue, values, resetForm } =
    useFormik<{
      file: DecodedFile | null;
    }>({
      initialValues,
      onSubmit: ({ file }) => {
        try {
          const password = state.join("");
          onAction({ file: file as DecodedFile, password });
          onRedirect();
        } catch (error) {
          console.log("error..", error);
          setError((error as Error)?.message ?? error);
          resetForm();
          setState(initialState);
        }
      },
    });

  const hasFile = useMemo(() => !!values.file, [values.file]);
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: { "application/json": [".json"] },
    onDrop: (acceptedFiles: File[]) => {
      const blob = new Blob([acceptedFiles[0]], {
        type: "text/plain;charset=utf-8",
      });
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = () => {
        if (reader.result) {
          const decodedFile: DecodedFile = JSON.parse(String(reader.result));
          setFieldValue(
            "file",
            decodedFile?.address?.length ? decodedFile : ""
          );
        }
      };
    },
  });

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 5000);
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <Interaction className="gap-10">
        <Interaction.Title onBack={onBack} onClose={onClose}>
          Import Account
        </Interaction.Title>
        <Interaction.Content className="flex-1">
          {hasFile ? (
            <div className="flex flex-col gap-5 flex-1">
              <Input.Vertical
                label="Account name"
                defaultValue={values?.file?.meta.name}
                placeholder="Account nae"
              />
              <OptionalField label="Protected by password?">
                <div className="flex items-center justify-between">
                  <Input.Passcode
                    focusOnInit
                    type={show ? "password" : "text"}
                    values={state}
                    onValuesChange={setState}
                  />
                  <Button.Icon variant="ghost" onClick={() => setShow(!show)}>
                    {show ? <EyeIcon /> : <EyeSlashIcon />}
                  </Button.Icon>
                </div>
              </OptionalField>
            </div>
          ) : (
            <div
              {...getRootProps({ className: "dropzone" })}
              className={classNames(
                isDragReject && "border-danger-base",
                "flex flex-col items-center text-center gap-2 cursor-pointer py-8 px-3 rounded-md border-primary border-2 border-dashed hover:border-level-4 transition-colors duration-300"
              )}
            >
              <input {...getInputProps()} />
              <FolderPlusIcon className="w-7 h-7 text-primary" />
              <div className="flex flex-col">
                <Typography.Text>Choose a file</Typography.Text>
                <Typography.Text variant="primary">
                  or drag and drop it here
                </Typography.Text>
              </div>
              {(isDragReject || error) && (
                <ErrorMessage>Invalid trading account</ErrorMessage>
              )}
            </div>
          )}
        </Interaction.Content>
        <Interaction.Footer>
          <Interaction.Action type="submit" disabled={!(isValid && dirty)}>
            Import account
          </Interaction.Action>
          <Interaction.Close onClick={onBack}>Back</Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </form>
  );
};
