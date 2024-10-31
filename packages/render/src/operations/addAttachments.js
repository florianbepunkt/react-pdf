const addAttachments = (ctx, root) => {
  const attachments = root.props.attachments || [];

  attachments.forEach((attachment) => {
    ctx.file(attachment.content, {
      creationDate: attachment.creationDate,
      description: attachment.description || "",
      modifiedDate: attachment.modifiedDate || attachment.creationDate,
      name: attachment.name,
      relationship: attachment.relationship,
      type: attachment.type,
      hidden: attachment.hidden || false,
    });
  });
};

export default addAttachments;
