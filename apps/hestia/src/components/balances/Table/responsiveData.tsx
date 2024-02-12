// import { Button, Drawer, Typography } from "@polkadex/ux";

// export const ResponsiveData = ({
//   open,
//   onClose,
//   data,
// }: {
//   open: boolean;
//   onClose: () => void;
//   data: Data | null;
// }) => {
//   return (
//     <Drawer closeOnClickOutside open={open} onClose={onClose}>
//       <Drawer.Title className="px-4">
//         {data?.name} ({data?.ticker})
//       </Drawer.Title>
//       <Drawer.Content className="flex flex-col gap-2 p-4">
//         <div className="flex items-center justify-between gap-2">
//           <Typography.Text appearance="primary">
//             Funding account
//           </Typography.Text>
//           <Typography.Text>{data?.funding}</Typography.Text>
//         </div>
//         <div className="flex items-center justify-between gap-2">
//           <Typography.Text appearance="primary">
//             Trading account
//           </Typography.Text>
//           <Typography.Text>{data?.funding}</Typography.Text>
//         </div>
//         <div className="flex items-center justify-between gap-2">
//           <Typography.Text appearance="primary">In orders</Typography.Text>
//           <Typography.Text>{data?.funding}</Typography.Text>
//         </div>
//       </Drawer.Content>
//       <Drawer.Footer className="p-4 flex items-center justify-center gap-2 flex-wrap border-t border-secondary-base">
//         <Button.Solid appearance="secondary" className="flex-1">
//           Deposit
//         </Button.Solid>
//         <Button.Solid appearance="secondary" className="flex-1">
//           Withdraw
//         </Button.Solid>
//         <Button.Solid appearance="secondary" className="flex-1">
//           Transfer
//         </Button.Solid>
//         <Button.Solid appearance="secondary" className="flex-1">
//           Trade
//         </Button.Solid>
//       </Drawer.Footer>
//     </Drawer>
//   );
// };
