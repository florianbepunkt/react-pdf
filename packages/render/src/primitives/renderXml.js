const renderXml = (ctx, node) => {
  const value = node.props?.value;

  if (value) ctx.appendXML(value);
};

export default renderXml;
