import React, { useContext, useState, useEffect } from "react"
import YAML from "yaml"
import { Context as GatewayContext } from "contexts/gateway"
import { Context as HttpContext } from "contexts/http"
import { INodeData, useNodeData } from "hooks/useNodeData"
import { TextOutput } from "components/TextOutput"

function stringifyNodeData(data: INodeData) {
  return YAML.stringify(data)
//   return `NodeInfo:
//   host: ${nodeInfo.host}
//   friendlyName: ${nodeInfo.friendlyName}
//   networkIdentifier: ${NetworkType[nodeInfo.networkIdentifier]}(${nodeInfo.networkIdentifier})
//   port: ${nodeInfo.port}
//   publicKey: ${nodeInfo.publicKey}
//   roles: ${nodeInfo.roles}
//   version: ${nodeInfo.version}
// NodeTime:
//   receive: ${new UInt64(nodeTime.receiveTimeStamp as number[]).toString()}
//   send: ${new UInt64(nodeTime.sendTimeStamp as number[]).toString()}
// ServerInfo:
//   REST Ver.: ${serverInfo.restVersion}
//   SDK Ver.: ${serverInfo.sdkVersion}
// Storage:
//   Num Accounts: ${storage.numAccounts}
//   Num Blocks: ${storage.numBlocks}
//   Num Transactions: ${storage.numTransactions}
}

export const Node: React.FC = () => {
  const gwContext = useContext(GatewayContext)
  const httpContext = useContext(HttpContext)

  const { nodeHttp, diagnosticHttp } = httpContext.httpInstance
  const {nodeData, loading, error} = useNodeData({ nodeHttp, diagnosticHttp })

  const [output, setOutput] = useState("")

  useEffect(() => {
    if(! nodeData) { return }
    setOutput(stringifyNodeData(nodeData))
  }, [nodeData])

  return (
<div>
  <fieldset>
    <legend>Node</legend>
    <div className="input-group vertical">
      <p>
      { true
        ? <a href={`${gwContext.url}/node/info`}
            target="_blank" rel="noopener noreferrer"
          >{`${gwContext.url}/node/info`}</a>
        : <span>{`${gwContext.url}/block/`}</span>
      }
      </p>
    </div>
  </fieldset>

  <TextOutput
    label="Node Data"
    value={output}
    loading={loading}
    error={error}
  ></TextOutput>
</div>
  )
}

export default Node
