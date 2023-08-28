export function clipboardCopy(content: string) {
  const fakeElement = createFakeElement(content);
  const copyRange = createCopyRange(fakeElement);

  setRangeAsSelection(copyRange);
  executeCopyAndClear(fakeElement);
}

function createFakeElement(content: string): HTMLParagraphElement {
  const element = document.createElement('p');
  element.textContent = content;

  return element;
}

function createCopyRange(fakeElement: HTMLParagraphElement): Range {
  document.body.appendChild(fakeElement);

  const range = document.createRange();
  range.setStartBefore(fakeElement);
  range.setEndAfter(fakeElement);

  return range;
}

function setRangeAsSelection(copyRange: Range) {
  const selection = window.getSelection();

  selection?.removeAllRanges();
  selection?.addRange(copyRange);
}

function executeCopyAndClear(fakeElement: HTMLParagraphElement) {
  document.execCommand('copy');
  document.body.removeChild(fakeElement);
}
