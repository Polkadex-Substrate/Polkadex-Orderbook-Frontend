import {
  EyeIcon,
  EyeSlashIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { Button, Input, Interaction, Loading, Typography } from "@polkadex/ux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";

import { ErrorMessage, OptionalField } from "../ReadyToUse";

export interface DecodedFile {
  encoded: string;
  encoding: {
    content: string[];
    type: string[];
    version: string;
  };
  address: string;
  meta: {
    name: string;
    whenCreated: number;
  };
}

const initialValues = {
  file: null,
};

const initialState = ["", "", "", "", ""];

// Replace De
const parseFile = (file: File): Promise<DecodedFile | string> =>
  new Promise((resolve) => {
    const blob = new Blob([file], {
      type: "text/plain;charset=utf-8",
    });
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const decodedFile: DecodedFile = JSON.parse(String(reader.result));
        resolve(decodedFile);
      } catch (error) {
        resolve("Error parsing file");
      }
    };
    reader.onerror = () => resolve("Error reading file");
    reader.readAsText(blob);
  });

export const ImportTradingAccount = ({
  loading,
  onClose,
  onImport,
  onRedirect,
  whitelistAccounts,
}: {
  onClose: () => void;
  onImport: (values: { password: string; file: DecodedFile }) => Promise<void>;
  onRedirect: () => void;
  loading: boolean;
  whitelistAccounts?: string[];
}) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [state, setState] = useState<(string | number)[]>(initialState);

  const { isValid, dirty, handleSubmit, setFieldValue, values, resetForm } =
    useFormik<{
      file: DecodedFile | null;
    }>({
      initialValues,
      onSubmit: async ({ file }) => {
        try {
          const password = state.join("");
          await onImport({ file: file as DecodedFile, password });
          onRedirect();
        } catch (error) {
          setError((error as Error)?.message ?? error);
          resetForm();
          setState(initialState);
        }
      },
    });

  // Move to validation
  // const isValidFile = useMemo(() => {
  //   if (!whitelistAccounts) return true;
  //   return (
  //     values.file?.address && whitelistAccounts.includes(values.file?.address)
  //   );
  // }, [values.file?.address, whitelistAccounts]);

  const hasFile = useMemo(() => !!values.file, [values.file]);
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      maxFiles: 1,
      validator: (file) => null, // Async validation not working...
      accept: { "application/json": [".json"] },
      onDrop: async (acceptedFiles: File[]) => {
        const decodedFile = await parseFile(acceptedFiles[0]);
        setFieldValue("file", decodedFile || "");
      },
    });

  return (
    <Loading.Spinner active={loading}>
      <form onSubmit={handleSubmit}>
        <Interaction className="gap-10">
          <Interaction.Title onClose={onClose}>
            Import Account
          </Interaction.Title>
          <Interaction.Content className="flex-1">
            {hasFile ? (
              <div className="flex flex-col gap-5 flex-1">
                <Input.Vertical
                  label="Account name"
                  defaultValue={values?.file?.meta?.name}
                  placeholder="Account name"
                />
                <OptionalField label="Protected by password?">
                  <div className="flex items-center justify-between">
                    <Input.Passcode
                      focusOnInit
                      type={show ? "password" : "text"}
                      values={state}
                      onValuesChange={setState}
                      className="bg-level-4"
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
                  isDragAccept && "border-success-base",
                  "flex flex-col items-center text-center gap-2 cursor-pointer py-8 px-3 rounded-md border-level-5 border-2 border-dashed hover:border-level-4 transition-colors duration-300"
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
                  <ErrorMessage>{error || "Invalid file"}</ErrorMessage>
                )}
              </div>
            )}
          </Interaction.Content>
          <Interaction.Footer>
            <Interaction.Action type="submit" disabled={!(isValid && dirty)}>
              Import account
            </Interaction.Action>
            <Interaction.Close onClick={onClose}>Back</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </form>
    </Loading.Spinner>
  );
};
