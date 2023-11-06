import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";

const Leaderboard = (props) => {
  function findRank(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i + 1;
      }
    }
    return -1;
  }

  const getBadgeColor = (role) => {
    if (role === 1) {
      return "amber";
    } else if (role === 2) {
      return "slate";
    } else if (role === 3) {
      return "stone";
    } else {
      return "gray";
    }
  };
  const generateAvatarUrl = (text) => {
    return `https://robohash.org/${text}?size=50x50`;
  };
  return (
    <>
      <Card className={props.className}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              {props.cell1 && <TableHeaderCell>{props.cell1}</TableHeaderCell>}
              {props.cell2 && <TableHeaderCell>{props.cell2}</TableHeaderCell>}
              {props.cell3 && <TableHeaderCell>{props.cell3}</TableHeaderCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items
              .sort((a, b) => b[props.scoringMetric] - a[props.scoringMetric])
              .map((item) => (
                <TableRow key={item[props.id]}>
                  <TableCell>
                    <Badge
                      color={getBadgeColor(
                        findRank(
                          props.items.sort(
                            (a, b) =>
                              b[props.scoringMetric] - a[props.scoringMetric]
                          ),
                          item
                        )
                      )}
                    >
                      {findRank(
                        props.items.sort(
                          (a, b) =>
                            b[props.scoringMetric] - a[props.scoringMetric]
                        ),
                        item
                      )}
                    </Badge>
                  </TableCell>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item[props.id] ? (
                      <img
                        src={generateAvatarUrl(item[props.id])}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <img
                        src={generateAvatarUrl("anonymous")}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                  {props.cell1 && (
                    <TableCell>
                      <Text color={props.theme || "purple"}>
                        {item[props.id] ? item[props.cell1] : "anonymous"}
                      </Text>
                    </TableCell>
                  )}
                  {props.cell2 && (
                    <TableCell>
                      <Text color={props.theme || "purple"}>
                        {item[props.cell2]}
                      </Text>
                    </TableCell>
                  )}
                  {props.cell3 && (
                    <TableCell>
                      <Text color={props.theme || "purple"}>
                        {item[props.cell3]}
                      </Text>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default Leaderboard;
