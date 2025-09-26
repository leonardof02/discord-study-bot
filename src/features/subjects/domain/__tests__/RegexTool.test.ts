import { describe } from "vitest";
import { RegexTool } from "../RegexTool";

describe("RegexTool", () => {
  let regexTool: RegexTool;

  beforeEach(() => {
    regexTool = new RegexTool();
  });

  it("should create a partial match regex ignoring accents", () => {
    const regex = regexTool.createPartialMatchRegex("nina");

    expect("niña".match(regex)).not.toBeNull();
    expect("NÍNA".match(regex)).not.toBeNull();
    expect("nina".match(regex)).not.toBeNull();
  });

  it("not should match if the substring is not present", () => {
    const regex = regexTool.createPartialMatchRegex("nina");

    expect("casa".match(regex)).toBeNull();
  });

  it("should escape special regex characters", () => {
    const regex = regexTool.createPartialMatchRegex("nina.");

    expect("niña.".match(regex)).not.toBeNull();
    expect("NÍNA.".match(regex)).not.toBeNull();
    expect("nina.".match(regex)).not.toBeNull();
    expect("niña".match(regex)).toBeNull();
  });

  it("should accept ü as a variant of u", () => {
    const regex = regexTool.createPartialMatchRegex("pingu");

    expect("pingüino".match(regex)).not.toBeNull();
  });
});
