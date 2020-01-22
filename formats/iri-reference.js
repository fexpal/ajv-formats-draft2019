const { parse } = require("uri-js");
const schemes = require("schemes");

module.exports.name = "iri-reference";
module.exports.validate = value => {
  const iri = parse(value);
  // All valid IRIs are valid IRI-references
  if (iri.scheme === "mailto" && iri.to.every(validate)) {
    return true;
  }

  if (
    iri.reference === "absolute" &&
    iri.path !== undefined &&
    schemes.allByName[iri.scheme]
  ) {
    return true;
  }

  // Check for valid IRI-reference

  // If there is a scheme, it must be valid
  if (iri.scheme && !schemes.allByName[iri.scheme]) {
    return false;
  }

  // Check there's a path and for a proper type of reference
  return (
    iri.path !== undefined &&
    (iri.reference === "relative" ||
      iri.reference === "same-document" ||
      iri.reference === "uri")
  );
};
